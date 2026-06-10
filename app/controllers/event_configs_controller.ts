import EventConfiguration from '#models/event_configuration';
import type { HttpContext } from '@adonisjs/core/http'

export default class EventConfigsController {

    async getOngoingEvent({ response }: HttpContext) {
        const e_ = await EventConfiguration.query().where('isActive', true).orderBy('createdAt', 'desc').first();
        return response.ok({ success: true, event: e_ })
    }

    async createEvent({ request, response }: HttpContext) {
        try {
            const newEvent = await EventConfiguration.create(request.all())
            return response.created({ success: true, message: `Event created successfully: ${newEvent.eventName}` })
        } catch (error) {
            return response.badRequest({ success: false, error: `Error creating event: ${error}` })
        }
    }

    async updateEvent({ request, response }: HttpContext) {
        const { id, name, description, isActive } = request.only(['id', 'name', 'description', 'isActive'])
        const event = await EventConfiguration.find(id)

        if (!event) {
            return response.notFound({ success: false, error: 'Event not found' })
        }

        event.eventName = name
        event.eventDescription = description
        event.isActive = isActive
        await event.save()

        return response.ok({ success: true, message: `Event updated successfully: ${event.eventName}` })
    }

    async deleteEvent({ request, response }: HttpContext) {
        const { id } = request.only(['id'])
        const event = await EventConfiguration.find(id)

        if (!event) {
            return response.notFound({ success: false, error: 'Event not found' })
        }

        await event.delete()
        return response.ok({ success: true, message: 'Event deleted successfully' })
    }
}