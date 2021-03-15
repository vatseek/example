const fs = require('fs')
const path = require('path')

const basename = path.basename(module.filename)
const schemas = fs
  .readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .reduce((n, file) => {
    const name = file.replace('.js', '')
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const func = require(path.join(__dirname, file))
    if (typeof func === 'function') {
      return { ...n, [name]: func }
    } else {
      console.log(`Invalid schema method: ${file}`)
    }

    return n
  }, {})

module.exports = {
  validate: (schemaName) => {
    if (!schemas[schemaName]) {
      console.log(`\nSchema not exists: ${schemaName}\n`)
    }

    return async (req, res, next) => {
      const { query = {}, body = {} } = req
      const data = { ...query, ...body }

      await schemas[schemaName]()
        .validate(data, { abortEarly: false, stripUnknown: true })
        .then((result) => {
          req.body = result
          return next()
        })
        .catch(function (e) {
          return res.status(422).json({ errors: e.errors })
        })
    }
  },
}
