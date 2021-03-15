import Model, { attr, belongsTo } from '@ember-data/model'

export default class EntityModel extends Model {
  @attr title
  @attr body
  @attr category_id
}
