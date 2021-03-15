import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'

export default class IndexRoute extends Route {
  @service store

  async model() {
    const categories = await this.store.findAll('category')
    const buildTree = (parentId = null) => {
      return categories.reduce((n, v) => {
        if (+v.parent_id !== +parentId) {
          return n
        }
        v.set('children', buildTree(v.id))
        return [...n, v]
      }, [])
    }

    return buildTree()
  }
}
