const fs = require('fs')
const path = require('path')
const Promise = require('bluebird')
const log = require('debug')('log')

const {
  AVAILABLE_TYPE,
  TYPE_JSON,
  TYPE_XML,
  TYPE_YML,
  CATEGORY_TYPE_BLOG,
  CATEGORY_TYPE_FORUM,
  CATEGORY_TYPE_NEWS,
} = require('../../constants')
const JSONEngine = require('./JSONEngine')
const BaseEngine = require('./BaseEngine')
const ImportService = require('../../services/ImportService')

class Parser {
  type = null
  engine = null

  /**
   *
   */
  constructor(type) {
    if (!AVAILABLE_TYPE.includes(type)) {
      throw new Error('Invalid data type')
    }
    this.type = type

    switch (type) {
      case TYPE_JSON:
        this.engine = new JSONEngine()
        break
      case TYPE_XML:
      case TYPE_YML:
        this.engine = new BaseEngine()
    }
  }

  /**
   * Get raw data from files
   */
  async getData(dir) {
    const read = Promise.promisify(fs.readFile)
    const readFile = async (filePathName) => {
      log('Read file:', filePathName)
      return read(filePathName).then((buf) => buf.toString())
    }

    return Promise.props({
      categories: readFile(path.resolve(dir, `categories.${this.type}`)),
      blogs: readFile(path.resolve(dir, `blogs.${this.type}`)),
      forums: readFile(path.resolve(dir, `forums.${this.type}`)),
      news: readFile(path.resolve(dir, `news.${this.type}`)),
    })
  }

  /**
   *
   */
  async parseData({ categories, blogs, forums, news }) {
    const result = await Promise.props({
      categories: this.engine.parseCategories(categories),
      blogs: this.engine.parseBlogs(blogs),
      forums: this.engine.parseForums(forums),
      news: this.engine.parseNews(news),
    })

    // Import new categories
    const categoriesList = await ImportService.importCategories(result.categories)

    // Import new blogs
    await ImportService.importBlogs(
      result.blogs,
      categoriesList.filter((i) => +i.type === +CATEGORY_TYPE_BLOG)
    )

    // Import new forums
    await ImportService.importForums(
      result.forums,
      categoriesList.filter((i) => +i.type === +CATEGORY_TYPE_FORUM)
    )

    // Import new forums
    await ImportService.importNews(
      result.news,
      categoriesList.filter((i) => +i.type === +CATEGORY_TYPE_NEWS)
    )
  }
}

module.exports = Parser
