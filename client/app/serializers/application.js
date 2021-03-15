import JSONAPISerializer from '@ember-data/serializer/json-api'
import { get } from 'lodash'

export default class ApplicationSerializer extends JSONAPISerializer {
  keyForAttribute(key) {
    return ['parent_id', 'category_id'].includes(key) ? key : super.keyForAttribute(key)
  }

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    const { modelName } = primaryModelClass
    let normalizedPayload = null

    if (['query', 'findAll'].includes(requestType)) {
      normalizedPayload = get(payload, 'result', []).map(({ id, ...attributes }) => {
        return {
          id,
          type: modelName,
          attributes,
        }
      })
    }

    return super.normalizeResponse(
      store,
      primaryModelClass,
      { data: normalizedPayload },
      id,
      requestType
    )
  }
}
