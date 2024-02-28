import './css/app.css'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
import 'floating-vue/dist/style.css'

import { VTooltip } from 'floating-vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { createApp, h, ref, type DefineComponent } from 'vue'

void createInertiaApp({
  progress: { color: '#5468FF' },

  resolve: (name) => {
    const pages = import.meta.glob<DefineComponent>('./pages/**/*.vue', { eager: true })
    return pages[`./pages/${name}.vue`] as any
  },

  setup({ el, App, props, plugin }) {
    const app = createApp({ render: () => h(App, props) })
      .directive('tooltip', VTooltip)
      .use(plugin)

    const modelViewerScriptLoaded = ref(false)
    app.config.globalProperties.modelViewerScriptLoaded = modelViewerScriptLoaded

    function loadModelViewerScript() {
      if (modelViewerScriptLoaded.value || !window.matchMedia('(min-width: 768px)').matches) {
        return
      }

      const scriptEl = document.createElement('script')
      scriptEl.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js'
      scriptEl.async = true
      scriptEl.type = 'module'
      scriptEl.onload = () => {
        modelViewerScriptLoaded.value = true
      }

      document.body.appendChild(scriptEl)
    }

    setTimeout(() => {
      window.requestIdleCallback(() => {
        loadModelViewerScript()
      })

      window.addEventListener('resize', () => {
        loadModelViewerScript()
      })
    }, 100)

    app.mount(el)
  },
})
