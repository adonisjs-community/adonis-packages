import './css/app.css'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
import 'floating-vue/dist/style.css'

import { createApp, h } from 'vue'
import { VTooltip } from 'floating-vue'
import { createInertiaApp } from '@inertiajs/vue3'

createInertiaApp({
  progress: { color: '#5468FF' },

  resolve: (name) => {
    const pages = import.meta.glob('./pages/**/*.vue', { eager: true })
    return pages[`./pages/${name}.vue`] as any
  },

  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .directive('tooltip', VTooltip)
      .use(plugin)
      .mount(el)
  },
})

window.requestIdleCallback(() => {
  if (!window.matchMedia('(min-width: 768px)').matches) {
    return
  }

  const scriptEl = document.createElement('script')
  scriptEl.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js'
  scriptEl.async = true
  scriptEl.onload = () => {
    const modelViewerEls = document.querySelectorAll('model-viewer[data-not-loaded]')

    for (const modelViewerEl of modelViewerEls) {
      modelViewerEl.removeAttribute('data-not-loaded')
    }
  }
  document.body.appendChild(scriptEl)
})
