import type { Ref } from 'vue'

export * from '../../types/main.js'

declare module 'vue' {
  interface ComponentCustomProperties {
    modelViewerScriptLoaded: Ref<boolean>
  }
}
