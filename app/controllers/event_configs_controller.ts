import EventConfiguration from '#models/event_configuration';
import type { HttpContext } from '@adonisjs/core/http'

export default class EventConfigsController {

    async getOngoingEvent({}: HttpContext) {
        const e_ = await EventConfiguration.query().where('isActive', true).first();
        return {
            events: e_,
        }
    }

    async createEvent({ request }: HttpContext) {
        const { name, description, isActive } = request.only(['name', 'description', 'isActive'])
        const newEvent = await EventConfiguration.create({ eventName: name, eventDescription: description, isActive })
        return newEvent
    }

    async updateEvent({ request }: HttpContext) {
        const { id, name, description, isActive } = request.only(['id', 'name', 'description', 'isActive'])
        const event = await EventConfiguration.find(id)

        if (!event) {
            return { error: 'Event not found' }
        }

        event.eventName = name
        event.eventDescription = description
        event.isActive = isActive
        await event.save()

        return event
    }

    async deleteEvent({ request }: HttpContext) {
        const { id } = request.only(['id'])
        const event = await EventConfiguration.find(id)

        if (!event) {
            return { error: 'Event not found' }
        }

        await event.delete()
        return { message: 'Event deleted successfully' }
    }
}