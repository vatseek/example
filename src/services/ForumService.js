const db = require('../libs/db')
const ModelService = require('./ModelService')

const TABLE_NAME = 'forums'

class ForumService extends ModelService {
  /**
   *
   * @param titles [string]
   * @returns {Promise<[blogs]>}
   */
  async getForumsByTitle(titles = []) {
    return db(this.tableName).select('*').whereIn('title', titles)
  }
}

module.exports = new ForumService(TABLE_NAME)
