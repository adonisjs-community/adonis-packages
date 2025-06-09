import '@fontsource-variable/instrument-sans'
import '../css/app.css'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
import 'floating-vue/dist/style.css'

import { vTooltip } from 'floating-vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { createApp, h, ref, type DefineComponent } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'

void createInertiaApp({
  progress: { color: '#5468FF' },

  resolve: (name) => {
    return resolvePageComponent(
      `../pages/${name}.vue`,
      import.meta.glob<DefineComponent>('../pages/**/*.vue'),
    )
  },

  setup({ el, App, props, plugin }) {
    const app = createApp({ render: () => h(App, props) })
      .directive('tooltip', vTooltip)
      .use(autoAnimatePlugin)
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
