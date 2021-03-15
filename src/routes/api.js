const { Router } = require('express')
const router = Router()

const getServiceByType = require('../helpers/getServiceByType')
const db = require('../libs/db')
const { validate } = require('../validators')
const CategoryService = require('../services/CategoryService')

/**
 *
 */
router.get('/api/v1/categories', validate('categorySearchValidator'), async (req, res) => {
  const { slug, parent_id } = req.body
  const query = CategoryService.query()
  if (slug) {
    query.where('slug', slug)
  }
  if (parent_id) {
    query.where('parent_id', parent_id)
  }

  const categories = await query.orderBy('id')

  return res.json({ result: categories })
})

/**
 *
 */
router.get('/api/v1/entities', validate('entitySearchValidator'), async (req, res) => {
  const { category_id, type, id } = req.body
  const query = getServiceByType(+type).query()

  if (category_id) {
    query.whereIn('category_id', function () {
      this.select('id')
        .from('categories')
        .where('parent_id', category_id)
        .union(db.raw(`SELECT ${category_id}`))
    })
  }

  if (id) {
    query.where('id', id)
  }
  const result = await query

  return res.json({ result })
})

module.exports = router
