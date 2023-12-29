// @ts-check
import { julr } from '@julr/tooling-configs/eslint'

export default julr({
  typescript: {
    tsconfigPath: ['./tsconfig.json', './resources/tsconfig.json'],
    typeAwareRules: false,
  },
})
