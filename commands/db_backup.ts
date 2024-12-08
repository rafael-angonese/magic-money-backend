import BackupService from '#services/backup_service'
import { inject } from '@adonisjs/core'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class DbBackup extends BaseCommand {
  static commandName = 'db:backup'
  static description = ''

  static options: CommandOptions = {
    startApp: true,
  }

  @inject()
  async run(backupService: BackupService) {
    try {
      this.logger.info('Running backup')
      await backupService.exec()
      this.logger.success('Backup run successfully')
    } catch (error) {
      this.logger.error(error.message)
      this.error = error
      this.exitCode = 1
    }
  }
}
