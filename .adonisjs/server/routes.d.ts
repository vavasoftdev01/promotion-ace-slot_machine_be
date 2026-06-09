import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'slot_machine.spin': { paramsTuple?: []; params?: {} }
    'slot_machine.minigame': { paramsTuple?: []; params?: {} }
    'slot_machine.config_jackpot': { paramsTuple?: []; params?: {} }
    'sample.balance': { paramsTuple?: []; params?: {} }
    'sample.ping': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'slot_machine.spin': { paramsTuple?: []; params?: {} }
    'slot_machine.minigame': { paramsTuple?: []; params?: {} }
    'sample.balance': { paramsTuple?: []; params?: {} }
    'sample.ping': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'slot_machine.spin': { paramsTuple?: []; params?: {} }
    'slot_machine.minigame': { paramsTuple?: []; params?: {} }
    'sample.balance': { paramsTuple?: []; params?: {} }
    'sample.ping': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'slot_machine.config_jackpot': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}