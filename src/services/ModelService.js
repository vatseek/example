const { pick } = require('lodash')

const db = require('../libs/db')

class ModelService {
  tableName = null

  constructor(tableName, fields = ['title', 'body', 'category_id']) {
    if (!tableName) {
      throw new Error('Invalid table name')
    }
    this.tableName = tableName
    this.fields = fields
  }

  query() {
    return db.from(this.tableName).select('*')
  }

  async createMultiple(items) {
    // console.log(items, this.fields, this.tableName)
    return db.batchInsert(
      this.tableName,
      items.map((i) => pick(i, this.fields))
    )
  }
}

module.exports = ModelService
