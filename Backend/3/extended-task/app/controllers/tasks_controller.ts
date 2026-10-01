import type { HttpContext } from '@adonisjs/core/http'
import Task from '#models/task'
import { createTaskValidator, updateTaskValidator } from '#validators/task'

export default class TasksController {
  // Return only tasks belonging to the authenticated user
  async index({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const tasks = await user.related('tasks').query()
    return response.status(200).json(tasks)
  }

  // Ensure task belongs to user before returning
  async show({ params, auth, response }: HttpContext) {
    const task = await Task.find(params.id)

    if (!task || task.userId !== auth.user!.id) {
      return response.status(404).json({ message: 'Task not found' })
    }

    return response.status(200).json(task)
  }

  // Create a new task tied to the authenticated user
  async store({ request, auth, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createTaskValidator)
      const user = auth.getUserOrFail()
      
      const task = await user.related('tasks').create(data)
      return response.status(201).json(task)
    } catch (error) {
      return response.status(400).json({ message: 'Invalid request' })
    }
  }

  // Verify ownership before applying updates
  async update({ params, request, auth, response }: HttpContext) {
    const task = await Task.find(params.id)

    if (!task) {
      return response.status(404).json({ message: 'Task not found' })
    }

    // Task 5: Ownership Check
    if (task.userId !== auth.user!.id) {
      return response.status(403).json({ message: 'Forbidden' })
    }

    try {
      const data = await request.validateUsing(updateTaskValidator)
      task.merge(data)
      await task.save()

      return response.status(200).json(task)
    } catch (error) {
      return response.status(400).json({ message: 'Invalid request' })
    }
  }

  // Verify ownership before deleting
  async destroy({ params, auth, response }: HttpContext) {
    const task = await Task.find(params.id)

    if (!task) {
      return response.status(404).json({ message: 'Task not found' })
    }

    // Task 5: Ownership Check
    if (task.userId !== auth.user!.id) {
      return response.status(403).json({ message: 'Forbidden' })
    }

    await task.delete()

    return response.status(200).json({ message: 'Task deleted successfully' })
  }
}
