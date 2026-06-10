/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.access_tokens.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.access_tokens.store']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'profile.access_tokens.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/account/logout',
    tokens: [{"old":"/api/v1/account/logout","type":0,"val":"api","end":""},{"old":"/api/v1/account/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/account/logout","type":0,"val":"account","end":""},{"old":"/api/v1/account/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['profile.access_tokens.destroy']['types'],
  },
  'slot_machine.spin': {
    methods: ["GET","HEAD"],
    pattern: '/promotion-ace/v1/spin',
    tokens: [{"old":"/promotion-ace/v1/spin","type":0,"val":"promotion-ace","end":""},{"old":"/promotion-ace/v1/spin","type":0,"val":"v1","end":""},{"old":"/promotion-ace/v1/spin","type":0,"val":"spin","end":""}],
    types: placeholder as Registry['slot_machine.spin']['types'],
  },
  'slot_machine.get_auth_user': {
    methods: ["GET","HEAD"],
    pattern: '/promotion-ace/v1/checkAuth',
    tokens: [{"old":"/promotion-ace/v1/checkAuth","type":0,"val":"promotion-ace","end":""},{"old":"/promotion-ace/v1/checkAuth","type":0,"val":"v1","end":""},{"old":"/promotion-ace/v1/checkAuth","type":0,"val":"checkAuth","end":""}],
    types: placeholder as Registry['slot_machine.get_auth_user']['types'],
  },
  'event_configs.get_ongoing_event': {
    methods: ["GET","HEAD"],
    pattern: '/promotion-ace/v1/ongoing-event',
    tokens: [{"old":"/promotion-ace/v1/ongoing-event","type":0,"val":"promotion-ace","end":""},{"old":"/promotion-ace/v1/ongoing-event","type":0,"val":"v1","end":""},{"old":"/promotion-ace/v1/ongoing-event","type":0,"val":"ongoing-event","end":""}],
    types: placeholder as Registry['event_configs.get_ongoing_event']['types'],
  },
  'event_configs.create_event': {
    methods: ["POST"],
    pattern: '/promotion-ace/v1/create-event',
    tokens: [{"old":"/promotion-ace/v1/create-event","type":0,"val":"promotion-ace","end":""},{"old":"/promotion-ace/v1/create-event","type":0,"val":"v1","end":""},{"old":"/promotion-ace/v1/create-event","type":0,"val":"create-event","end":""}],
    types: placeholder as Registry['event_configs.create_event']['types'],
  },
  'slot_machine.minigame': {
    methods: ["GET","HEAD"],
    pattern: '/promotion-ace/v1/minigame',
    tokens: [{"old":"/promotion-ace/v1/minigame","type":0,"val":"promotion-ace","end":""},{"old":"/promotion-ace/v1/minigame","type":0,"val":"v1","end":""},{"old":"/promotion-ace/v1/minigame","type":0,"val":"minigame","end":""}],
    types: placeholder as Registry['slot_machine.minigame']['types'],
  },
  'slot_machine.config_jackpot': {
    methods: ["POST"],
    pattern: '/promotion-ace/v1/config/jackpot',
    tokens: [{"old":"/promotion-ace/v1/config/jackpot","type":0,"val":"promotion-ace","end":""},{"old":"/promotion-ace/v1/config/jackpot","type":0,"val":"v1","end":""},{"old":"/promotion-ace/v1/config/jackpot","type":0,"val":"config","end":""},{"old":"/promotion-ace/v1/config/jackpot","type":0,"val":"jackpot","end":""}],
    types: placeholder as Registry['slot_machine.config_jackpot']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
