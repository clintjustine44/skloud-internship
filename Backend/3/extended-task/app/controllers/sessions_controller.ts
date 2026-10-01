import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async store({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    /**
     * Find user by email
     */
    const user = await User.findBy('email', email)
    if (!user) {
      return response.abort('Invalid credentials')
    }

    /**
     * Verify password
     */
    const isPasswordValid = await hash.verify(user.password, password)
    if (!isPasswordValid) {
      return response.abort('Invalid credentials')
    }

    // Login user...
  }
}
