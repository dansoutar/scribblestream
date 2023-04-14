import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken'
import { appKey } from 'Config/app'
import User from 'App/Models/User'

export default class ValidateToken {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const { request, response } = ctx

    if (!request.header('Authorization')) {
      response.status(401)
      response.send({
        message: 'Authorization header is missing!',
      })

      return
    }

    const token = request.header('Authorization')?.split(' ')[1]

    const decoded = jwt.verify(token, appKey, (err, decoded) => {
      if (err !== null) {
        return null
      }

      return decoded
    })

    if (!decoded) {
      response.status(401)
      response.send({
        message: 'Authorization token is malformed',
      })

      return
    }

    const user = await User.find(decoded.data.user.id)

    if (!user) {
      response.status(404)
      response.send({
        message: 'User does not exist',
      })

      return
    }

    request.all().user = user

    await next()
  }
}
