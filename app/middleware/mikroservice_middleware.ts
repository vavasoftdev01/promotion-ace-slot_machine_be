import RedisService from '#services/redis_service'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import logger from '@adonisjs/core/services/logger'

export default class MikroserviceMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    // 1. Grab the raw Authorization header string
    const authHeader = ctx.request.header('authorization') // Returns: "Bearer your_actual_token_here"

    // 2. Safety check: make sure the header exists and starts with "Bearer "
    if (authHeader && authHeader.startsWith('Bearer ')) {
      
    // 3. Split the string by space and grab the second item (index 1)
      const token = authHeader.split(' ')[1]

      if (!token) {
        return { statusCode: 401, message: 'Unauthorized access, please login.', error: 'Unauthorized' }
      }
    
    // 4. Use the extracted token to call the Redis microservice
      try {
        const redis = new RedisService()
        const response = await redis.send('BALANCE', { token })

        if (!response.success) {
          logger.info(JSON.stringify(response))
          return { statusCode: 401, message: 'Unauthorized access, please login.', error: 'Unauthorized' }
        }

        const user = { success: response.success, ...response.data.data, token }
        logger.info(`User authenticated: ${JSON.stringify(user)}`)
        ctx.authUser = { success: response.success, ...response.data.data, token }

        const output = await next()
        return output
      } catch (error) {
        logger.error(`Error in MikroserviceMiddleware: ${error}`)
        return { statusCode: 500, message: 'Internal Server Error', error: 'Internal Server Error' }
      }
    }
  }
}