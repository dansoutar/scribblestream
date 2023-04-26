import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import bcrypt from 'bcrypt'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        email: 'danny@adonisjs.com',
        password: await bcrypt.hash('secret', 10),
      },
      {
        email: 'jack@adonisjs.com',
        password: await bcrypt.hash('secret', 10),
      },
      {
        email: 'brett@adonisjs.com',
        password: await bcrypt.hash('secret', 10),
      },
      {
        email: 'joe@adonisjs.com',
        password: await bcrypt.hash('secret', 10),
      },
      {
        email: 'jane@adonisjs.com',
        password: await bcrypt.hash('secret', 10),
      },
    ])
  }
}
