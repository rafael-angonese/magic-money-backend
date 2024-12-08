import RestoreService from '#services/restore_service'
import { inject } from '@adonisjs/core'
import { args, BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class DbRestore extends BaseCommand {
  static commandName = 'db:restore'
  static description = ''

  static options: CommandOptions = {
    startApp: true,
  }

  @args.string()
  declare name: string

  @inject()
  async run(restoreService: RestoreService) {
    try {
      this.logger.info('Running restore')
      await restoreService.exec(this.name)
      this.logger.success('Restore run successfully')
    } catch (error) {
      this.logger.error(error.message)
      this.error = error
      this.exitCode = 1
    }
  }
}
