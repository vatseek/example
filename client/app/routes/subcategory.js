import Route from '@ember/routing/route'

export default class SubcategoryRoute extends Route {
  async model(params) {
    const { category_slug, parent_slug } = params
    const first = (res) => res.get('firstObject')

    const category = await this.store.query('category', { slug: category_slug }).then(first)
    const parent = await this.store.query('category', { slug: parent_slug }).then(first)
    if (!category) {
      return
    }

    const mapCategories = (i) => {
      i.set('subcategory', category)
      i.set('category', parent)
      return i
    }

    const { id, type } = category
    const entities = (await this.store.query('entity', { category_id: id, type })).map(
      mapCategories
    )

    return {
      subcategory: category,
      category: parent,
      entities,
    }
  }
}
