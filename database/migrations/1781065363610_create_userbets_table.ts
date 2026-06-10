import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'userbets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('user_id').notNullable()
      table.integer('event_id').unsigned().notNullable()
      table.integer('bet_amount').nullable()
      table.string('bet_combination_result').notNullable()
      table.boolean('is_winner').defaultTo(false)
      table.boolean('is_jackpot').defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}