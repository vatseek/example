const db = require('../libs/db')
const ModelService = require('./ModelService')

const TABLE_NAME = 'blogs'

class BlogService extends ModelService {
  /**
   *
   * @param titles [string]
   * @returns {Promise<[blogs]>}
   */
  async getBlogsByTitle(titles = []) {
    return db(this.tableName).select('*').whereIn('title', titles)
  }
}

module.exports = new BlogService(TABLE_NAME)
