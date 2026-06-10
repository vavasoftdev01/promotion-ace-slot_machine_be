/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.new_account.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_tokens.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'profile.profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
    }
  }
  'profile.access_tokens.destroy': {
    methods: ["POST"]
    pattern: '/api/v1/account/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['destroy']>>>
    }
  }
  'slot_machine.spin': {
    methods: ["GET","HEAD"]
    pattern: '/promotion-ace/v1/spin'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/slot_machine_controller').default['spin']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/slot_machine_controller').default['spin']>>>
    }
  }
  'slot_machine.get_auth_user': {
    methods: ["GET","HEAD"]
    pattern: '/promotion-ace/v1/checkAuth'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/slot_machine_controller').default['getAuthUser']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/slot_machine_controller').default['getAuthUser']>>>
    }
  }
  'event_configs.get_ongoing_event': {
    methods: ["GET","HEAD"]
    pattern: '/promotion-ace/v1/ongoing-event'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/event_configs_controller').default['getOngoingEvent']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/event_configs_controller').default['getOngoingEvent']>>>
    }
  }
  'event_configs.create_event': {
    methods: ["POST"]
    pattern: '/promotion-ace/v1/create-event'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/event_configs_controller').default['createEvent']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/event_configs_controller').default['createEvent']>>>
    }
  }
  'slot_machine.minigame': {
    methods: ["GET","HEAD"]
    pattern: '/promotion-ace/v1/minigame'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/slot_machine_controller').default['minigame']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/slot_machine_controller').default['minigame']>>>
    }
  }
  'slot_machine.config_jackpot': {
    methods: ["POST"]
    pattern: '/promotion-ace/v1/config/jackpot'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/slot_machine_controller').default['configJackpot']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/slot_machine_controller').default['configJackpot']>>>
    }
  }
}
