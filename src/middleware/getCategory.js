const { get } = require('lodash')
const CategoryService = require('../services/CategoryService')

module.exports = async (req, res, next) => {
  const categorySlug = get(req, 'params.category')
  const notFound = () => res.status(404).send('Category not found')
  if (!categorySlug) {
    return notFound()
  }
  const category = await CategoryService.query().where('slug', categorySlug).first()
  if (!category) {
    return notFound()
  }

  req.category = category

  next()
}
