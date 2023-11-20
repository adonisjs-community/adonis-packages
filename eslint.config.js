// @ts-check
import { julr } from '@julr/tooling-configs/eslint'

export default julr({
  typescript: {
    tsconfigPath: ['./tsconfig.node.json', './tsconfig.vue.json'],
    typeAwareRules: false,
  },
})
