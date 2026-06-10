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
    pattern: '/api/spin',
    tokens: [{"old":"/api/spin","type":0,"val":"api","end":""},{"old":"/api/spin","type":0,"val":"spin","end":""}],
    types: placeholder as Registry['slot_machine.spin']['types'],
  },
  'slot_machine.minigame': {
    methods: ["GET","HEAD"],
    pattern: '/api/minigame',
    tokens: [{"old":"/api/minigame","type":0,"val":"api","end":""},{"old":"/api/minigame","type":0,"val":"minigame","end":""}],
    types: placeholder as Registry['slot_machine.minigame']['types'],
  },
  'slot_machine.config_jackpot': {
    methods: ["POST"],
    pattern: '/api/config/jackpot',
    tokens: [{"old":"/api/config/jackpot","type":0,"val":"api","end":""},{"old":"/api/config/jackpot","type":0,"val":"config","end":""},{"old":"/api/config/jackpot","type":0,"val":"jackpot","end":""}],
    types: placeholder as Registry['slot_machine.config_jackpot']['types'],
  },
  'sample.balance': {
    methods: ["GET","HEAD"],
    pattern: '/api/sample/balance',
    tokens: [{"old":"/api/sample/balance","type":0,"val":"api","end":""},{"old":"/api/sample/balance","type":0,"val":"sample","end":""},{"old":"/api/sample/balance","type":0,"val":"balance","end":""}],
    types: placeholder as Registry['sample.balance']['types'],
  },
  'sample.get_ongoing_event': {
    methods: ["GET","HEAD"],
    pattern: '/api/sample/ongoing-event',
    tokens: [{"old":"/api/sample/ongoing-event","type":0,"val":"api","end":""},{"old":"/api/sample/ongoing-event","type":0,"val":"sample","end":""},{"old":"/api/sample/ongoing-event","type":0,"val":"ongoing-event","end":""}],
    types: placeholder as Registry['sample.get_ongoing_event']['types'],
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
