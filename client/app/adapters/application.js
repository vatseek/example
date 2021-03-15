import RESTAdapter from '@ember-data/adapter/rest'
import config from 'client/config/environment'

export default class ApplicationAdapter extends RESTAdapter {
  namespace = 'api/v1'
  host = config.APIRoot
}
