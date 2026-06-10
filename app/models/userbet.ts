import { UserbetSchema } from '#database/schema'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import EventConfiguration from './event_configuration.ts'

export default class Userbet extends UserbetSchema {
    public static table = 'userbets'

    @column()
    declare user_id: string
    
    @column()
    declare event_id: number

    @belongsTo(() => EventConfiguration, {
        localKey: 'event_id',
        foreignKey: 'id',
    })
    eventConfiguration: any
}