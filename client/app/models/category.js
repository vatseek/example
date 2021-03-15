import Model, { attr } from '@ember-data/model';


export default class CategoryModel extends Model {
  @attr name;
  @attr slug;
  @attr type;
  @attr parent_id;
  @attr children;
}
