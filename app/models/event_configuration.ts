import { EventsConfigurationSchema } from '#database/schema'

export default class EventConfiguration extends EventsConfigurationSchema {
    public static table = 'events_configurations'
}