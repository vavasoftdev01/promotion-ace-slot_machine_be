import RedisService from '#services/redis_service'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import logger from '@adonisjs/core/services/logger'

export default class MikroserviceMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    console.log('MikroserviceMiddleware called')
    
    const authHeader = ctx.request.header('authorization')

    // 1. Check if header is missing or malformed
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      logger.warn('Authorization header missing or malformed in MikroserviceMiddleware')
      return ctx.response.unauthorized({ 
        message: 'Unauthorized access, please login.', 
        error: 'Unauthorized' 
      })
    }
      
    // 2. Extract token
    const token = authHeader.split(' ')[1]

    if (!token) {
      return ctx.response.unauthorized({ 
        message: 'Unauthorized access, please login.', 
        error: 'Unauthorized' 
      })
    }
    
    // 3. Process Redis Authentication
    try {
      const redis = new RedisService()
      const response = await redis.send('BALANCE', { token })

      // If Redis says validation failed
      if (!response.success) {
        logger.info(JSON.stringify(response))
        return ctx.response.unauthorized({ 
          message: 'Unauthorized access, please login.', 
          error: 'Unauthorized' 
        })
      }

      // If validation succeeded, assign user data
      const user = { success: response.success, ...response.data.data, token }
      logger.info(`User authenticated: ${JSON.stringify(user)}`)
      ctx.authUser = user

      // Continue down the execution pipeline
      return await next()
    } catch (error) {
      logger.error(`Error in MikroserviceMiddleware: ${error}`)
      return ctx.response.internalServerError({ 
        message: 'Internal Server Error', 
        error: 'Internal Server Error' 
      })
    }
  }
}
