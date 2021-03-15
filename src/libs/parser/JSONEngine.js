const BaseEngine = require('./BaseEngine')
const log = require('debug')('log:parser')

class JSONEngine extends BaseEngine {
  parseJSON(data) {
    try {
      return JSON.parse(data)
    } catch (e) {
      log('Invalid input data', data)
      throw e
    }
  }

  /**
   *
   */
  async parseCategories(categoriesRaw) {
    const categories = this.parseJSON(categoriesRaw)

    return categories.reduce((n, { name, alias, type, children }) => {
      n = n.concat({ name, slug: alias, type })
      const parentSlug = alias
      if (!Array.isArray(children) || !children.length) {
        return n
      }

      return n.concat(
        children.map(({ name, alias, ord }) => ({
          parent: parentSlug,
          slug: alias,
          name,
          ord,
          type,
        }))
      )
    }, [])
  }

  async parseBlogs(blogsRaw) {
    return this.parseJSON(blogsRaw)
  }

  async parseForums(forumsRaw) {
    return this.parseJSON(forumsRaw)
  }

  async parseNews(newsRaw) {
    return this.parseJSON(newsRaw)
  }
}

module.exports = JSONEngine
