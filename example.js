const packets = require('minecraft-packets')

console.log(packets.pc['1.16']['from-server'].difficulty)

// output:
// [
//  {
//    json: { difficulty: 2, difficultyLocked: false },
//    raw: <Buffer 0d 02 00>
//  }
// ]
