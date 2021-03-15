const log = require('debug')('log:import')
const { get } = require('lodash')

const CategoryService = require('./CategoryService')
const BlogService = require('./BlogService')
const ForumService = require('./ForumService')
const NewsService = require('./NewsService')

class ImportService {
  /**
   *
   */
  static async importCategories(categories) {
    const slugs = categories.map((i) => i.slug)
    const existingCategories = await CategoryService.getCategoriesBySlag(slugs)
    const existingCategoriesSlug = existingCategories.map((i) => i.slug)

    // Create root categories
    const rootCategoriesToCreate = categories.filter((i) => {
      return !i.parent && !existingCategoriesSlug.includes(i.slug)
    })

    log(`Create new root categories:`, rootCategoriesToCreate.length)
    if (rootCategoriesToCreate.length) {
      await CategoryService.createMultiple(rootCategoriesToCreate)
    }
    const rootCategories = await CategoryService.getRootCategories()

    // Create rest categories
    const categoriesToCreate = categories.reduce((n, v) => {
      if (existingCategoriesSlug.includes(v.slug) || !v.parent) {
        return n
      }

      return [
        ...n,
        {
          ...v,
          parent_id: get(
            rootCategories.find((i) => i.slug === v.parent),
            'id'
          ),
        },
      ]
    }, [])

    log(`Create new child categories:`, categoriesToCreate.length)
    if (categoriesToCreate.length) {
      await CategoryService.createMultiple(categoriesToCreate)
    }

    return CategoryService.getCategories()
  }

  /**
   * Generic func to import same entities (blogs, news, forums)
   */
  static async importEntities(items, categories, getExisting, createMultiple) {
    const existingItemsTitles = await getExisting()

    const itemsToCreate = items.reduce((n, { title, body, category }) => {
      if (existingItemsTitles.includes(title)) {
        return n
      }

      return [
        ...n,
        {
          title,
          body,
          category_id: get(
            categories.find((i) => i.slug === category),
            'id'
          ),
        },
      ]
    }, [])

    log(`Items to create:`, itemsToCreate.length)
    if (itemsToCreate.length) {
      return createMultiple(itemsToCreate)
    }
  }

  /**
   *
   */
  static async importBlogs(blogs, categories) {
    const getExisting = async () => {
      return (await BlogService.getBlogsByTitle(blogs.map((i) => i.title))).map((i) => i.title)
    }

    log(`Start import BLOGS`)
    await ImportService.importEntities(blogs, categories, getExisting, (items) =>
      BlogService.createMultiple(items)
    )
  }

  /**
   *
   */
  static async importForums(forums, categories) {
    const getExisting = async () => {
      return (await ForumService.getForumsByTitle(forums.map((i) => i.title))).map((i) => i.title)
    }

    log(`Start import FORUMS`)
    await ImportService.importEntities(forums, categories, getExisting, (items) =>
      ForumService.createMultiple(items)
    )
  }

  /**
   *
   */
  static async importNews(news, categories) {
    const getExisting = async () => {
      return (await NewsService.getNewsByTitle(news.map((i) => i.title))).map((i) => i.title)
    }

    log(`Start import NEWS`)
    await ImportService.importEntities(news, categories, getExisting, (items) =>
      NewsService.createMultiple(items)
    )
  }
}

module.exports = ImportService
