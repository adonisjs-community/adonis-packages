import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'

import './css/app.css'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob('./pages/**/*.vue', { eager: true })
    return pages[`./pages/${name}.vue`]
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el)
  },
})
