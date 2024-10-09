import { AccountType } from '#constants/account_type'
import Account from '#models/account'
import BankAccount from '#models/bank_account'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const personalAccount = await Account.create({
      name: 'Personal Account',
      type: AccountType.PERSONAL,
    })

    const businessAccount = await Account.create({
      name: 'Business Account',
      type: AccountType.BUSINESS,
    })

    await User.createMany([
      {
        name: 'Personal User',
        email: 'pernsonal@admin.com',
        password: '123456',
        accountId: personalAccount.id,
      },
      {
        name: 'Business User',
        email: 'business@admin.com',
        password: '123456',
        accountId: businessAccount.id,
      },
    ])

    await BankAccount.createMany([
      {
        name: 'Personal Bank Account',
        balance: 0,
        accountId: personalAccount.id,
      },
      {
        name: 'Business Bank Account',
        balance: 0,
        accountId: businessAccount.id,
      },
    ])
  }
}
