/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

// Auth controllers
Route.post('/auth/login', 'AuthController.login')
Route.post('/auth/register', 'AuthController.register')

// User controllers
Route.get('/user', 'UsersController.index').middleware('jwt')
Route.get('/user/me', 'UsersController.me').middleware('jwt')

// Blog controllers
Route.group(() => {
  Route.get('/', 'BlogController.index')
  Route.get('/:id', 'BlogController.show')
  Route.post('/', 'BlogController.store')
  Route.patch('/:id', 'BlogController.update')
  Route.delete('/:id', 'BlogController.destroy')
})
  .prefix('/blog')
  .middleware('jwt')
