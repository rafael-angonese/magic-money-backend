import User from '#models/user'
import { loginValidator } from '#validators/auth/auth'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    return User.accessTokens.create(user)
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.user!

    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    return response.status(ResponseStatus.Ok)
  }

  async me({ auth }: HttpContext) {
    await auth.check()

    return {
      data: auth.user,
    }
  }
}
