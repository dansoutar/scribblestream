import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class UsersController {
  public async index(ctx: HttpContextContract) {
    const allUsers = await User.all()

    return { allUsers }
  }

  public async me(ctx: HttpContextContract) {
    const { request } = ctx

    return { me: request.all().user }
  }
}
