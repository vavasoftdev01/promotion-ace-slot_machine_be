import logger from '@adonisjs/core/services/logger'
import type { HttpContext } from '@adonisjs/core/http'
import RedisService from '#services/redis_service'

export default class SampleController {
  async balance({ request }: HttpContext) {
    const token = request.input('token')

    if (!token) {
      return { statusCode: 401, message: 'Unauthorized access, please login.', error: 'Unauthorized' }
    }

    const redis = new RedisService()
    const response = await redis.send('BALANCE', { token })

    if (!response.success) {
      logger.info(JSON.stringify(response))
      return { statusCode: 401, message: 'Unauthorized access, please login.', error: 'Unauthorized' }
    }

    const user = { success: response.success, ...response.data.data, token }
    logger.info(`User authenticated: ${JSON.stringify(user)}`)
    return user
  }
}
