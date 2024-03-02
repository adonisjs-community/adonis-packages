import { vTooltip } from 'floating-vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h, type DefineComponent, ref } from 'vue'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'

export default function render(page) {
  return createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      return resolvePageComponent(
        `./pages/${name}.vue`,
        import.meta.glob<DefineComponent>('./pages/**/*.vue'),
      )
    },

    setup({ App, props, plugin }) {
      const app = createSSRApp({ render: () => h(App, props) })
        .use(plugin)
        .directive('tooltip', vTooltip)
        .directive('autoAnimate', {})

      app.config.globalProperties.modelViewerScriptLoaded = ref(false)

      return app
    },
  })
}
