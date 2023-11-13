/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const ModulesController = () => import('#controllers/modules_controller')
import router from '@adonisjs/core/services/router'

router.get('/', [ModulesController, 'renderLanding'])
