import env from '#start/env'
import logger from '@adonisjs/core/services/logger'
import drive from '@adonisjs/drive/services/main'
import { DateTime } from 'luxon'
import { exec } from 'node:child_process'
import path from 'node:path'

export default class BackupService {
  private host = env.get('DB_HOST')
  private port = env.get('DB_PORT')
  private user = env.get('DB_USER')
  private password = env.get('DB_PASSWORD')
  private database = env.get('DB_DATABASE')

  public async exec(): Promise<void> {
    const timestamp = DateTime.now().toFormat('yyyy-MM-dd')
    const fileName = `${timestamp}.sql`
    const filePath = path.resolve(process.cwd(), `storage/backups/${fileName}`)

    try {
      await this.createDatabaseDump(filePath)
      await this.uploadToS3(fileName)
      await this.deleteLocalDump(fileName)

      logger.info(`Backup ${fileName} realizado sucesso.`)
    } catch (error) {
      logger.error(`Erro ao realizar backup: ${error.message}`)
    }
  }

  private async createDatabaseDump(filePath: string): Promise<void> {
    const dumpCommand = `PGPASSWORD=${this.password} pg_dump -h ${this.host} -p ${this.port} -U ${this.user} ${this.database} > ${filePath}`

    return new Promise((resolve, reject) => {
      exec(dumpCommand, (error, stdout, stderr) => {
        if (error) {
          reject(new Error(`Erro ao realizar o dump: ${error.message}`))
          return
        }
        if (stderr) {
          logger.warn(stderr)
        }
        resolve()
      })
    })
  }

  private async uploadToS3(fileName: string): Promise<void> {
    try {
      const file = await drive.use('fs').getStream(`/backups/${fileName}`)
      const s3Key = `backups/${fileName}`
      await drive.use('s3').putStream(s3Key, file)
      logger.info(`Arquivo ${fileName} enviado para o S3 com sucesso: ${s3Key}`)
    } catch (err) {
      throw new Error(`Erro ao enviar para o S3: ${err.message}`)
    }
  }

  private async deleteLocalDump(fileName: string): Promise<void> {
    try {
      await drive.use('fs').delete(`/backups/${fileName}`)
      logger.info(`Arquivo local ${fileName} excluído com sucesso.`)
    } catch (error) {
      logger.error(`Erro ao excluir o arquivo local ${fileName}: ${error.message}`)
    }
  }
}
