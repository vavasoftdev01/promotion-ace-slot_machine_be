import EventConfiguration from '#models/event_configuration';
import type { HttpContext } from '@adonisjs/core/http'

export default class EventConfigsController {

    async getOngoingEvent({ response }: HttpContext) {
        const e_ = await EventConfiguration.query().where('isActive', true).orderBy('createdAt', 'desc').first();
        if (e_) {
            const jsonFields = ['eventDescription', 'prizeDetails', 'jackpotCombinations']
            for (const field of jsonFields) {
                if (typeof (e_ as any)[field] === 'string') {
                    try { (e_ as any)[field] = JSON.parse((e_ as any)[field]) } catch {}
                }
            }
        }
        return response.ok({ success: true, event: e_ })
    }

    async createEvent({ request, response }: HttpContext) {
        try {
            const body = request.all()
            const jsonFields = ['eventDescription', 'prizeDetails', 'jackpotCombinations']
            for (const field of jsonFields) {
                if (body[field] && typeof body[field] === 'object') {
                    body[field] = JSON.stringify(body[field])
                }
            }
            const newEvent = await EventConfiguration.create(body)
            return response.created({ success: true, message: `Event created successfully: ${newEvent.eventName}` })
        } catch (error) {
            return response.badRequest({ success: false, error: `Error creating event: ${error}` })
        }
    }

    async updateEvent({ request, response }: HttpContext) {
        const body = request.all()
        const jsonFields = ['eventDescription', 'prizeDetails', 'jackpotCombinations']
        for (const field of jsonFields) {
            if (body[field] && typeof body[field] === 'object') {
                body[field] = JSON.stringify(body[field])
            }
        }
        const event = await EventConfiguration.find(body.id)

        if (!event) {
            return response.notFound({ success: false, error: 'Event not found' })
        }

        if (body.name) event.eventName = body.name
        if (body.eventDescription) event.eventDescription = body.eventDescription
        if (body.isActive !== undefined) event.isActive = body.isActive
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