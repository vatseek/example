import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'

export default class CategoryRoute extends Route {
  @service store

  async model(params) {
    const { category_slug } = params
    const category = await this.store.query('category', { slug: category_slug }).then((res) => {
      return res.get('firstObject')
    })
    if (!category) {
      return
    }

    const { id, type } = category
    const subcategories = await this.store.query('category', { parent_id: id })
    const mapCategories = (i) => {
      const sub = subcategories.find((c) => +c.get('id') === +i.get('category_id'))
      i.set('subcategory', sub)
      i.set('category', category)
      return i
    }

    const entities = (await this.store.query('entity', { category_id: id, type })).map(
      mapCategories
    )

    return {
      category,
      entities,
    }
  }
}
