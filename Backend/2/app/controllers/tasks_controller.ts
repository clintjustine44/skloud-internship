import type { HttpContext } from '@adonisjs/core/http'
import Task from '#models/task'
import { createTaskValidator, updateTaskValidator } from '#validators/task'

export default class TasksController {
  // GET /tasks
  // Return all tasks
  async index({ response }: HttpContext) {
    const tasks = await Task.all()

    return response.status(200).json(tasks)
  }

  // GET /tasks/:id
  // Return a task by id
  async show({ params, response }: HttpContext) {
    const task = await Task.find(params.id)

    if (!task) {
      return response.status(404).json({
        message: 'Task not found',
      })
    }

    return response.status(200).json(task)
  }

  // POST /tasks
  // Validate and create a new task
  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createTaskValidator)

      const task = await Task.create(data)

      return response.status(201).json(task)
    } catch (error) {
      return response.status(400).json({
        message: 'Invalid request',
      })
    }
  }

  // PATCH /tasks:id
  // Update an existing task.
  async update({ params, request, response }: HttpContext) {
    const task = await Task.find(params.id)

    // If task not found, return error 404
    if (!task) {
      return response.status(404).json({
        message: 'Task not found',
      })
    }

    try {
      const data = await request.validateUsing(updateTaskValidator)

      task.merge(data)
      await task.save()

      return response.status(200).json(task)
    } catch (error) {
      return response.status(400).json({
        message: 'Invalid request',
      })
    }
  }

  // DELETE /tasks:id
  // Delete an existing task
  async destroy({ params, response }: HttpContext) {
    const task = await Task.find(params.id)

    // If task not found, return error 404
    if (!task) {
      return response.status(404).json({
        message: 'Task not found',
      })
    }

    await task.delete()

    return response.status(200).json({
      message: 'Task deleted successfully',
    })
  }
}
