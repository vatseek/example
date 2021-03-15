const { get } = require('lodash')
const CategoryService = require('../services/CategoryService')

module.exports = async (req, res, next) => {
  const categorySlug = get(req, 'params.subcategory')
  const notFound = () => res.status(404).send('Subcategory not found')
  if (!categorySlug) {
    return notFound()
  }

  const category = await CategoryService.query()
    .where('slug', categorySlug)
    .where('parent_id', req.category.id)
    .first()
  if (!category) {
    return notFound()
  }

  req.subcategory = category

  next()
}
