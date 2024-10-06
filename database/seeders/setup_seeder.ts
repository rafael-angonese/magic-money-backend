import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        name: 'Admin',
        email: 'admin@admin.com',
        password: '123456',
      },
      {
        name: 'Admin PJ',
        email: 'admin-pj@admin.com',
        password: '123456',
      },
    ])
  }
}
