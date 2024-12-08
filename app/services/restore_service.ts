import env from '#start/env'
import logger from '@adonisjs/core/services/logger'
import drive from '@adonisjs/drive/services/main'
import { exec } from 'node:child_process'
import path from 'node:path'

export default class RestoreService {
  private host = env.get('DB_HOST')
  private port = env.get('DB_PORT')
  private user = env.get('DB_USER')
  private password = env.get('DB_PASSWORD')
  private database = env.get('DB_DATABASE')

  public async exec(fileName: string): Promise<void> {
    const filePath = path.resolve(process.cwd(), `storage/backups/${fileName}`)

    try {
      await this.downloadS3File(fileName)
      await this.restoreDatabaseDump(filePath)
      await this.deleteLocalDump(fileName)

      logger.info(`Restore ${fileName} realizado sucesso.`)
    } catch (error) {
      logger.error(`Erro ao realizar restore: ${error.message}`)
    }
  }

  private async downloadS3File(fileName: string): Promise<void> {
    try {
      const file = await drive.use('s3').getStream(`/backups/${fileName}`)
      await drive.use('fs').putStream(`/backups/${fileName}`, file)
      logger.info(`Arquivo ${fileName} baixado com sucesso`)
    } catch (err) {
      throw new Error(`Erro ao baixar o arquivo do S3: ${err.message}`)
    }
  }

  private async restoreDatabaseDump(filePath: string): Promise<void> {
    const restoreCommand = `PGPASSWORD=${this.password} psql -h ${this.host} -p ${this.port} -U ${this.user} -d ${this.database} -f ${filePath}`

    return new Promise((resolve, reject) => {
      exec(restoreCommand, (error, stdout, stderr) => {
        if (error) {
          reject(new Error(`Erro ao realizar o restore: ${error.message}`))
          return
        }
        if (stderr) {
          logger.warn(stderr)
        }
        resolve()
      })
    })
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
