class BaseEngine {
  constructor() {}

  /**
   * Return categories flat list
   *
   * @param categoriesRaw
   * @returns {Promise<[{ parent, slug, name, ord, type},...]>}
   */
  async parseCategories(categoriesRaw) {
    throw new Error('Should implement')
  }

  /**
   *
   * @param blogsRaw
   * @returns {Promise<[{ title, body, category }]>}
   */
  async parseBlogs(blogsRaw) {
    throw new Error('Should implement')
  }

  /**
   *
   * @param forumsRaw
   * @returns {Promise<[{ title, body, category }]>}
   */
  async parseForums(forumsRaw) {
    throw new Error('Should implement')
  }

  /**
   *
   * @param newsRaw
   * @returns {Promise<[{ title, body, category }]>}
   */
  async parseNews(newsRaw) {
    throw new Error('Should implement')
  }
}

module.exports = BaseEngine
