import Route from '@ember/routing/route'

export default class EntityRoute extends Route {
  async model(params) {
    const { category_slug, parent_slug, id } = params
    const first = (res) => res.get('firstObject')
    const category = await this.store.query('category', { slug: category_slug }).then(first)
    const parent = await this.store.query('category', { slug: parent_slug }).then(first)
    const entity = await this.store.query('entity', { id, type: category.type }).then(first)

    return {
      subcategory: category,
      category: parent,
      entity,
    }
  }
}
