const fs = require('fs')
const path = require('path')

const DATA_PATH = path.join(__dirname, '/minecraft-packets/data')
const gameTypes = fs.readdirSync(DATA_PATH)
const data = {}

for (const gameType of gameTypes) {
  const versions = fs.readdirSync(path.join(DATA_PATH, gameType))
  data[gameType] = {}
  for (const version of versions) {
    if (version.endsWith('.md')) {
      continue
    }
    const sendTypes = fs.readdirSync(path.join(DATA_PATH, gameType, version))
    data[gameType][version] = {}
    for (const sendType of sendTypes) {
      if (sendType.endsWith('.md') || sendType === 'metadata') {
        continue
      }
      const packets = fs.readdirSync(path.join(DATA_PATH, gameType, version, sendType))
      data[gameType][version][sendType] = {}
      for (const packet of packets) {
        const files = fs.readdirSync(path.join(DATA_PATH, gameType, version, sendType, packet))
        data[gameType][version][sendType][packet] = [] // files
        for (const file of files) {
          let [index, type] = file.split('.')
          index-- // decrement so the arrays wont have an empty slot (nmpd starts dumping at packet 1)
          const entry = data[gameType][version][sendType][packet]
          if (!entry[index]) {
            entry[index] = {}
          }
          if (type === 'json') {
            Object.defineProperty(entry[index], type, { enumerable: true, get () { return require(path.join(DATA_PATH, gameType, version, sendType, packet, file)) } })
          } else if (type === 'raw') {
            Object.defineProperty(entry[index], type, { enumerable: true, get () { return fs.readFileSync(path.join(DATA_PATH, gameType, version, sendType, packet, file)) } })
          }
        }
      }
    }
  }
}

module.exports = data
