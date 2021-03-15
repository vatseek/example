import EmberRouter from '@ember/routing/router'

export default class Router extends EmberRouter {}

Router.map(function () {
  this.route('category', { path: '/:category_slug' })
  this.route('subcategory', { path: '/:parent_slug/:category_slug' })
  this.route('entity', { path: '/:parent_slug/:category_slug/:id' })
})
