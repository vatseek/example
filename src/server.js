'use strict'
/* global process, require */

require('dotenv').config()
const express = require('express')
const cors = require('cors')

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason)
})

const app = express()
app.use(cors())
const PORT = process.env.PORT || 3000

const commonRouter = require('./routes/common')
const apiRouter = require('./routes/api')

app.use(apiRouter)
app.use(commonRouter)

// prettier-ignore
Promise.resolve()
  .then(() => {
    return new Promise((resolve, reject) => {
      app.listen(PORT, (err) => {
        console.log(`Example app listening at http://localhost:${PORT}`)
        err ? reject(err) : resolve()
      })
    })
  })
  .catch((e) => {
    console.log(e)
  })
