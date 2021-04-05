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
        data[gameType][version][sendType][packet] = files
      }
    }
  }
}

module.exports = data
