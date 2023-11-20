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

router.get('/', [PackagesController, 'getHome'])
router.get('/packages/:name', [PackagesController, 'getPackage'])
