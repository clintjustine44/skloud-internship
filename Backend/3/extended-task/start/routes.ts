import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import TasksController from '#controllers/tasks_controller'
import AccessTokensController from '#controllers/access_tokens_controller'
import NewAccountController from '#controllers/new_account_controller'
import ProfileController from '#controllers/profile_controller'

// Task 1: Registration
router.post('/users', [NewAccountController, 'store'])

// Task 2: Authentication (Make sure this is AccessTokensController, NOT SessionsController)
router.post('/sessions', [AccessTokensController, 'store'])

// Tasks 3 & 4: Protected Routes (Explicitly require 'api' guard)
router.group(() => {
  router.get('/me', [ProfileController, 'show'])
  router.get('/tasks', [TasksController, 'index'])
  router.get('/tasks/:id', [TasksController, 'show'])
  router.post('/tasks', [TasksController, 'store'])
  router.patch('/tasks/:id', [TasksController, 'update'])
  router.delete('/tasks/:id', [TasksController, 'destroy'])
}).use(middleware.auth({ guards: ['api'] }))