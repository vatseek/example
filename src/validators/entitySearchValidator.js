const yup = require('yup')

module.exports = () => {
  return yup.object().shape({
    category_id: yup.number().integer().positive(),
    id: yup.number().integer().positive(),
    type: yup.string().max(3).required(),
  })
}
