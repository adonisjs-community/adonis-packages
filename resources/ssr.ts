import { VTooltip } from 'floating-vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h, type DefineComponent, ref } from 'vue'

export default function render(page) {
  return createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      const pages = import.meta.glob<DefineComponent>('./pages/**/*.vue', { eager: true })
      return pages[`./pages/${name}.vue`]
    },

    setup({ App, props, plugin }) {
      const app = createSSRApp({ render: () => h(App, props) })
        .use(plugin)
        .directive('tooltip', VTooltip)

      app.config.globalProperties.modelViewerScriptLoaded = ref(false)

      return app
    },
  })
}
