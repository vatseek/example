const yup = require('yup')

module.exports = () => {
  return yup.object().shape({
    slug: yup.string(),
    parent_id: yup.number().integer().positive(),
  })
}
