const NewsService = require('../services/NewsService')
const BlogService = require('../services/BlogService')
const ForumService = require('../services/ForumService')

const { CATEGORY_TYPE_FORUM, CATEGORY_TYPE_BLOG, CATEGORY_TYPE_NEWS } = require('../constants')

module.exports = (type) => {
  switch (type) {
    case CATEGORY_TYPE_FORUM:
      return ForumService

    case CATEGORY_TYPE_NEWS:
      return NewsService

    case CATEGORY_TYPE_BLOG:
      return BlogService

    default:
      throw new Error('Invalid service')
  }
}
