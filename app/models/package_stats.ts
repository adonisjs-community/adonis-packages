import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class PackageStats extends BaseModel {
  @column({ isPrimary: true }) declare id: number

  @column() declare packageName: string
  @column() declare weeklyDownloads: number
  @column() declare githubStars: number
  @column.dateTime() declare firstReleaseAt: DateTime | null
  @column.dateTime() declare lastReleaseAt: DateTime | null

  @column.dateTime({ autoCreate: true }) declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true }) declare updatedAt: DateTime
}
