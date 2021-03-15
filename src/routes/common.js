const { Router } = require('express')
const router = Router()
const { get } = require('lodash')

const getServiceByType = require('../helpers/getServiceByType')
const getCategory = require('../middleware/getCategory')
const getSubcategory = require('../middleware/getSubcategory')
const CategoryService = require('../services/CategoryService')

/**
 *
 */
router.get('/', async (req, res) => {
  const categories = await CategoryService.query().orderBy('id')

  // Create tree recursively
  const buildTree = (parentId = null) => {
    const items = categories.filter((i) => i.parent_id === parentId)
    if (items.length) {
      return items.map((i) => ({ ...i, children: buildTree(i.id) }))
    }

    return items
  }

  res.send(buildTree())
})

/**
 *
 */
router.get('/:category', getCategory, async (req, res) => {
  const category = req.category
  const type = +category.type
  const Service = getServiceByType(type)

  const entities = await Service.query()
    .clear('select')
    .select(`${Service.tableName}.*`)
    .select('categories.name as category_name')
    .orderBy('id')
    .innerJoin('categories', 'categories.id', `${Service.tableName}.category_id`)

  res.send({ category, entities })
})

/**
 *
 */
router.get('/:category/:subcategory', getCategory, getSubcategory, async (req, res) => {
  const { category, subcategory } = req
  const type = +subcategory.type
  const Service = getServiceByType(type)

  const entities = await Service.query().where('category_id', subcategory.id).orderBy('id')

  res.json({
    category,
    subcategory,
    entities,
  })
})

/**
 *
 */
router.get('/:category/:subcategory/:id', getCategory, getSubcategory, async (req, res) => {
  const { category, subcategory } = req
  const id = get(req, 'params.id')
  const type = +subcategory.type
  const Service = getServiceByType(type)

  const entity = await Service.query().where('id', id).where('category_id', subcategory.id).first()
  if (!entity) {
    return res.status(404).send('Invalid item')
  }

  res.json({
    category,
    subcategory,
    entity,
  })
})

module.exports = router
