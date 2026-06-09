/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())
  })
  .prefix('/api/v1')

router.get('/api/spin', [controllers.SlotMachine, 'spin'])
router.get('/api/minigame', [controllers.SlotMachine, 'minigame'])
router.post('/api/config/jackpot', [controllers.SlotMachine, 'configJackpot'])

router.get('/api/sample/balance', [controllers.Sample, 'balance'])
router.get('/api/sample/ping', [controllers.Sample, 'ping'])
