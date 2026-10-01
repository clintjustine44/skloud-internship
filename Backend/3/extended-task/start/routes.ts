import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import TasksController from '#controllers/tasks_controller'
import AccessTokensController from '#controllers/access_tokens_controller'
import NewAccountController from '#controllers/new_account_controller'
import ProfileController from '#controllers/profile_controller'

router.post('/users', [NewAccountController, 'store'])

router.post('/sessions', [AccessTokensController, 'store'])

router.group(() => {
  router.get('/me', [ProfileController, 'show'])
  router.get('/tasks', [TasksController, 'index'])
  router.get('/tasks/:id', [TasksController, 'show'])
  router.post('/tasks', [TasksController, 'store'])
  router.patch('/tasks/:id', [TasksController, 'update'])
  router.delete('/tasks/:id', [TasksController, 'destroy'])
}).use(middleware.auth({ guards: ['api'] }))