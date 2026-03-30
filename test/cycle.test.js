/* eslint-env mocha, jest */
// Tests packet serialization/deserialization from with raw binary in nodejs
const { createSerializer, createDeserializer, states } = require('minecraft-protocol')
const mcPackets = require('minecraft-packets')
const assert = require('assert')

const makeClientSerializer = version => createSerializer({ state: states.PLAY, version, isServer: true })
const makeClientDeserializer = version => createDeserializer({ state: states.PLAY, version })

// Upstream bug in minecraft-protocol: the registryEntryHolder write handler
// does `offset += 1` instead of writing a 0x00 varint byte for inline sound data,
// leaving uninitialized buffer contents via Buffer.allocUnsafe in protodef.
// This causes non-deterministic round-trip failures for sound_effect packets
// that use inline sound names (versions 1.19.3+).
// Workaround: zero the serialization buffer before writing to neutralize the bug.
const origAllocUnsafe = Buffer.allocUnsafe
Buffer.allocUnsafe = function (size) {
  return Buffer.alloc(size)
}

Object.entries(mcPackets.pc).forEach(([ver, data]) => {
  let serializer, deserializer

  function convertBufferToObject (buffer) {
    return deserializer.parsePacketBuffer(buffer)
  }

  function convertObjectToBuffer (object) {
    return serializer.createPacketBuffer(object)
  }

  function testBuffer (buffer, [packetName, packetIx]) {
    const parsed = convertBufferToObject(buffer).data
    const parsedBuffer = convertObjectToBuffer(parsed)
    const areEq = buffer.equals(parsedBuffer)
    if (!areEq) {
      console.log('buffer', buffer.toString('hex'))
      console.log('buffer', parsedBuffer.toString('hex'))
    }
    assert.strictEqual(areEq, true, `Error when testing ${+packetIx + 1} ${packetName} packet`)
  }
  describe(`Test version ${ver}`, () => {
    serializer = makeClientSerializer(ver)
    deserializer = makeClientDeserializer(ver)
    // server -> client
    Object.entries(data['from-server']).forEach(([packetName, packetData]) => {
      it(`${packetName} packet`, () => {
        for (const i in packetData) {
          testBuffer(packetData[i].raw, [packetName, i])
        }
      })
    })
  })
})

afterAll(() => {
  Buffer.allocUnsafe = origAllocUnsafe
})
