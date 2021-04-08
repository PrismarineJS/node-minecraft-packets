# node-minecraft-packets
[![NPM version](https://img.shields.io/npm/v/minecraft-packets.svg)](http://npmjs.com/package/minecraft-packets)
[![Build Status](https://github.com/PrismarineJS/node-minecraft-packets/workflows/CI/badge.svg)](https://github.com/PrismarineJS/node-minecraft-packets/actions?query=workflow%3A%22CI%22)
[![Discord](https://img.shields.io/badge/chat-on%20discord-brightgreen.svg)](https://discord.gg/GsEFRM8)
[![Try it on gitpod](https://img.shields.io/badge/try-on%20gitpod-brightgreen.svg)](https://gitpod.io/#https://github.com/PrismarineJS/node-minecraft-packets)

Minecraft packets in a github repo.
## Usage

[See examples here](example.js)

```js
const packets = require('minecraft-packets')

console.log(packets.pc['1.16']['from-server'].difficulty[0])

// output:
// [
//  {
//    json: { difficulty: 2, difficultyLocked: false },
//    raw: <Buffer 0d 02 00>
//  }
// ]

```

## API

[Read the api here](api.md)
