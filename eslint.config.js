// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  formatters: true,
}, {
  rules: {
    'ts/consistent-type-definitions': 'off',
  },
})
