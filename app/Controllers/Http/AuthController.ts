import bcrypt from 'bcrypt'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken'

import { appKey } from 'Config/app'

import User from 'App/Models/User'

export default class AuthController {
  public async register(ctx: HttpContextContract) {
    const { request } = ctx

    const isDuplicateUser = await User.findBy('email', request.body().email)

    if (isDuplicateUser) {
      ctx.response.status(500)

      return { message: 'User already exists!' }
    }

    const { email, password } = request.body()

    await User.create({
      email,
      password: await bcrypt.hash(password, 10),
    })

    return {
      message: 'New user created!',
    }
  }

  public async login(ctx: HttpContextContract) {
    const { request } = ctx

    const { email, password: requestPassword } = request.body()

    const user = await User.findBy('email', email)

    if (!user) {
      ctx.response.status(404)

      return { message: 'User not found' }
    }

    const isValidPassword = await bcrypt.compare(requestPassword, user.password)

    if (!isValidPassword) {
      ctx.response.status(401)

      return { message: 'Password is invalid' }
    }

    const exp = Number(Date.now()) + 1000 * 60 * 60 * 24 * 1 // milliseconds * seconds * minutes * hours * days

    const token = jwt.sign(
      {
        iss: 'danny-blog-api',
        exp,
        sub: 'user_auth',
        aud: user.id,
        data: {
          user: {
            id: user.id,
            email: user.email,
          },
        },
      },
      appKey
    )

    return {
      message: 'User successfully logged in!',
      access_token: token,
    }
  }
}
