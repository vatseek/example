const { CATEGORY_TYPE_NEWS, CATEGORY_TYPE_BLOG, CATEGORY_TYPE_FORUM } = require('../src/constants')

exports.up = function (knex) {
  return knex.schema.createTable('categories', (table) => {
    table.increments()
    table.integer('parent_id').unsigned().references('id').inTable('categories')
    table.string('name', 100).notNullable()
    table.string('slug', 100).notNullable().index()
    table.enum('type', [CATEGORY_TYPE_NEWS, CATEGORY_TYPE_BLOG, CATEGORY_TYPE_FORUM])
    table.integer('ord').defaultTo(0)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('categories')
}
