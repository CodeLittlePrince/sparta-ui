const path = require('path')
const fs = require('fs')

fs.rmdirSync(path.resolve('lib'), { recursive: true })