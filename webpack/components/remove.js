const path = require('path')
const fs = require('fs')
const lib = path.resolve('lib')
const exists = fs.existsSync(lib)

if (exists) {
  fs.rmdirSync(lib, { recursive: true })
}