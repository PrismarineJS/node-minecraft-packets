const fs = require('fs')
const path = require('path')

const DATA_PATH = './minecraft-packets/data'
const gameTypes = fs.readdirSync(DATA_PATH)
const data = {}

for (const gameType of gameTypes) {
  const versions = fs.readdirSync(path.join(DATA_PATH, gameType))
  data[gameType] = {}
  for (const version of versions) {
    const sendTypes = fs.readdirSync(path.join(DATA_PATH, gameType, version))
    data[gameType][version] = {}
    for (const sendType of sendTypes) {
      const packets = fs.readdirSync(path.join(DATA_PATH, gameType, version, sendType))
      data[gameType][version][sendType] = {}
      for (const packet of packets) {
        const files = fs.readdirSync(path.join(DATA_PATH, gameType, version, sendType, packet))
        data[gameType][version][sendType][packet] = [] // files
        for (const file of files) {
          let fileData = null
          let [index, type] = file.split('.')
          index-- // decrement so the arrays wont have an empty slot (nmpd starts dumping at packet 1)
          if (file.endsWith('.json')) {
            fileData = require(path.join(__dirname, DATA_PATH, gameType, version, sendType, packet, file))
          } else if (file.endsWith('.raw')) {
            fileData = fs.readFileSync(path.join(__dirname, DATA_PATH, gameType, version, sendType, packet, file))
          }
          if (!data[gameType][version][sendType][packet][index]) {
            data[gameType][version][sendType][packet][index] = {}
          }
          data[gameType][version][sendType][packet][index][type] = fileData
          // data[gameType][version][sendType][packet][file] = fileData
        }
      }
    }
  }
}

module.exports = data
