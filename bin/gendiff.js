#!/usr/bin/env node

import genDiff from '../src/index.js'

const [,, filepath1, filepath2] = process.argv
const result = genDiff(filepath1, filepath2)
console.log(JSON.stringify(result, null, 2))
