import { randomUUID } from 'node:crypto'
import logger from '@adonisjs/core/services/logger'
import redis from '@adonisjs/redis/services/main'

export default class RedisService {
  async send(code: string, message: any): Promise<any> {
    logger.debug(`MICROSERVICE: ${code} , message: ${JSON.stringify(message)}`)

    const connection = redis.connection('main')
    const correlationId = randomUUID()
    const responseChannel = `${code}.reply`
    const timeoutMs = 10000

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        connection.unsubscribe(responseChannel)
        reject(new Error(`Redis response timeout for ${code}`))
      }, timeoutMs)

      connection.subscribe(responseChannel, (raw: string) => {
        let packet: any
        try {
          packet = JSON.parse(raw)
        } catch {
          return
        }

        if (packet.id !== correlationId) return

        clearTimeout(timer)
        connection.unsubscribe(responseChannel)

        if (packet.err) {
          reject(new Error(packet.err.message || packet.err))
        } else {
          resolve(packet.response ?? packet)
        }
      }, {
        onSubscription() {
          connection.publish(
            code,
            JSON.stringify({ pattern: code, data: message, id: correlationId })
          )
        },
        onError(error: any) {
          clearTimeout(timer)
          reject(error)
        },
      })
    })
  }
}
