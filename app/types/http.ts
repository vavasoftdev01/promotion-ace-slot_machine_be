import { HttpContext } from '@adonisjs/core/http'

declare module '@adonisjs/core/http' {
  interface HttpContext {
    authUser?: {
      success: boolean
      [key: string]: any
      token: string
    }
  }
}