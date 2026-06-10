/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessTokens: {
      store: typeof routes['auth.access_tokens.store']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
    accessTokens: {
      destroy: typeof routes['profile.access_tokens.destroy']
    }
  }
  slotMachine: {
    spin: typeof routes['slot_machine.spin']
    getAuthUser: typeof routes['slot_machine.get_auth_user']
    minigame: typeof routes['slot_machine.minigame']
    configJackpot: typeof routes['slot_machine.config_jackpot']
  }
  eventConfigs: {
    getOngoingEvent: typeof routes['event_configs.get_ongoing_event']
    createEvent: typeof routes['event_configs.create_event']
  }
}
