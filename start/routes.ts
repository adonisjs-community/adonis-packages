/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const PackagesController = () => import('#controllers/packages_controller')
const OgImagesController = () => import('#controllers/og_images_controller')

router.get('/', [PackagesController, 'getHome'])
router.get('/packages/:name', [PackagesController, 'getPackage'])
router.get('/packages/:name/og.png', [OgImagesController]).as('og_image')

router.get('/healthcheck', ({ response }) => response.noContent())
