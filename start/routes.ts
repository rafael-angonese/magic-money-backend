/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
const CategoriesController = () => import('#controllers/categories_controller')
const AccountsController = () => import('#controllers/accounts_controller')
const UsersController = () => import('#controllers/users_controller')
const BankAccountsController = () => import('#controllers/bank_accounts_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.post('/login', [AuthController, 'login'])
    router.delete('/logout', [AuthController, 'logout']).use(middleware.auth())
    router.get('/me', [AuthController, 'me'])
  })
  .prefix('auth')

router
  .group(() => {
    router.resource('categories', CategoriesController).apiOnly()
    router.resource('accounts', AccountsController).apiOnly()
    router.resource('users', UsersController).apiOnly()
    router.resource('bank-accounts', BankAccountsController).apiOnly()
  })
  .use(middleware.auth())
