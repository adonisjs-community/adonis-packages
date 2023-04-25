export default defineEventHandler((event) => {
  event.node.res.setHeader('Cache-Control', 'public, max-age=3600')
})
