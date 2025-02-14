import { julr } from '@julr/tooling-configs/eslint'

export default julr({
  unocss: false,
  typescript: {
    forceDecorators: true,
    tsconfigPath: ['./tsconfig.json', './inertia/tsconfig.json'],
    typeAwareRules: false,
  },
})
