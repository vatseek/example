const db = require('../libs/db')
const ModelService = require('./ModelService')

const TABLE_NAME = 'news'

class NewsService extends ModelService {
  /**
   *
   * @param titles [string]
   * @returns {Promise<[blogs]>}
   */
  async getNewsByTitle(titles = []) {
    return db(this.tableName).select('*').whereIn('title', titles)
  }
}

module.exports = new NewsService(TABLE_NAME)
