'use strict'

const fs = require('fs')
require('dotenv').config()

const Parser = require('../libs/parser')
const { AVAILABLE_TYPE } = require('../constants')

const [node, file, type, path] = process.argv
const fileNames = ['categories', 'blogs', 'forums', 'news']

;(async () => {
  // Check type param
  if (!AVAILABLE_TYPE.includes(type)) {
    console.error('\x1b[31mInvalid data type')
    console.log(`\x1b[32mAvailable types: `, JSON.stringify(AVAILABLE_TYPE))
    process.exit(0)
  }

  // Check if dir contain files
  try {
    const files = fs.readdirSync(path)
    fileNames.forEach((i) => {
      const fileName = `${i}.${type}`
      if (!files.includes(fileName)) {
        throw new Error(`File not exists: ${fileName}`)
      }
    })
  } catch (e) {
    throw new Error(e.message)
  }

  // Run parser
  const parser = new Parser(type)
  const rawData = await parser.getData(path)
  await parser.parseData(rawData)
})()
  .catch((e) => {
    console.log(e)
  })
  .finally(() => {
    process.exit(0)
  })
