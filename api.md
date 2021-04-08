# API

The api for this package is made to be as similar as https://github.com/PrismarineJS/minecraft-packets/tree/main/data/

so for example if you want the raw version of the 2nd `spawn_entity_living` packet, you would do...

```js
const packets = require('minecraft-packets')
// raw:
console.log(packets.pc['1.16']['from-server'].spawn_entity_living[1].raw)
// or for the parsed version: 
console.log(packets.pc['1.16']['from-server'].spawn_entity_living[1].json)
```
