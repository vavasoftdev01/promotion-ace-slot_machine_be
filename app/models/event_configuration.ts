import { EventsConfigurationSchema } from '#database/schema'
import { column } from '@adonisjs/lucid/orm'

export default class EventConfiguration extends EventsConfigurationSchema {
    public static table = 'events_configurations'

    @column({ columnName: 'event_name' })
    declare eventName: string

   @column({ columnName: 'event_start_time' })
    declare eventStartTime: string

    @column({ columnName: 'event_end_time' })
    declare eventEndTime: string

    @column({ columnName: 'event_description' })
    declare eventDescription: string

    @column({ columnName: 'jackpot_combinations' })
    declare jackpotCombinations: string

    @column({ columnName: 'prize_details' })
    declare prizeDetails: string

    @column({ columnName: 'is_active' })
    declare isActive: boolean
}