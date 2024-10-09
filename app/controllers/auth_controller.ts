import User from '#models/user'
import { loginValidator } from '#validators/auth/login_validator'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    const accessToken = await User.accessTokens.create(user)

    return accessToken
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.user!

    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    return response.status(ResponseStatus.Ok)
  }

  async me({ auth }: HttpContext) {
    await auth.check()

    await auth.user!.load('account')

    return auth.user
  }
}
