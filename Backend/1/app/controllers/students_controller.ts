import type { HttpContext } from '@adonisjs/core/http'

const students = [
  { id: 1, name: 'Anna' },
  { id: 2, name: 'John' },
]

export default class StudentsController {
  // Get /students
  async index({ response }: HttpContext) {
    return response.json(students)
  }

  // Get /students/:id
  async show({ params, response }: HttpContext) {
    const student = students.find((s) => s.id === Number(params.id))

    if (!student) {
      return response.status(404).json({ message: 'Student not found' })
    }

    return response.json(student)
  }

  // Post /students
  async store({ request, response }: HttpContext) {
    const name = request.input('name')

    if (!name) {
      return response.status(400).json({ message: 'Name is required' })
    }

    const newId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1

    const newStudent = { id: newId, name }
    students.push(newStudent)

    return response.status(201).json(newStudent)
  }
}
