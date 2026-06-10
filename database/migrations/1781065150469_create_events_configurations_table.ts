import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'events_configurations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('event_start_time').notNullable()
      table.timestamp('event_end_time').notNullable()
      table.string('event_name').notNullable()
      table.text('event_description').notNullable()
      table.text('prize_details').notNullable()
      table.text('jackpot_combinations').notNullable()
      table.boolean('is_active').defaultTo(true)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}