exports.up = function (knex) {
  return knex.schema.createTable('news', (table) => {
    table.increments()
    table.integer('category_id').unsigned().references('id').inTable('categories')
    table.string('title', 255).notNullable()
    table.text('body')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('news')
}
