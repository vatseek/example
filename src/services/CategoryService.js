const db = require('../libs/db')
const ModelService = require('./ModelService')

const TABLE_NAME = 'categories'
const CATEGORY_FIELDS = ['name', 'ord', 'parent_id', 'slug', 'type']

class CategoryService extends ModelService {
  /**
   *
   */
  async getCategoriesBySlag(slugs) {
    return db.from(this.tableName).select('*').whereIn('slug', slugs)
  }

  /**
   *
   */
  async getRootCategories() {
    return db.from(this.tableName).select('*').where('parent_id', null)
  }

  /**
   *
   */
  async getCategories() {
    return db.from(this.tableName).select('*')
  }
}

module.exports = new CategoryService(TABLE_NAME, CATEGORY_FIELDS)
