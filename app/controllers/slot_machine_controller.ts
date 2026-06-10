import { randomInt } from 'node:crypto'
import type { HttpContext } from '@adonisjs/core/http'
import EventConfiguration from '#models/event_configuration'
import collect from 'collect.js'

const COMMON_SYMBOLS = ['cherry','cherry','cherry','cherry','lemon','lemon','orange','seven','star','grape','watermelon','diamond']
const JACKPOT_LETTERS = ['K','B','C','G','A','M','E']

const reels = JACKPOT_LETTERS.map(letter => [...COMMON_SYMBOLS, letter])

const MULTIPLIERS: Record<string, number> = {
  seven: 10, bar: 8, bell: 5, cherry: 3, lemon: 2, orange: 2,
  plum: 2, star: 4, grape: 3, watermelon: 4, diamond: 15,
}

const paylines = [
  { name: 'Col 1', positions: [[0,0],[1,0],[2,0]], description: 'Reel 1', direction: 'vertical', enabled: true },
  { name: 'Col 2', positions: [[0,1],[1,1],[2,1]], description: 'Reel 2', direction: 'vertical', enabled: true },
  { name: 'Col 3', positions: [[0,2],[1,2],[2,2]], description: 'Reel 3', direction: 'vertical', enabled: true },
  { name: 'Col 4', positions: [[0,3],[1,3],[2,3]], description: 'Reel 4', direction: 'vertical', enabled: true },
  { name: 'Col 5', positions: [[0,4],[1,4],[2,4]], description: 'Reel 5', direction: 'vertical', enabled: true },
  { name: 'Col 6', positions: [[0,5],[1,5],[2,5]], description: 'Reel 6', direction: 'vertical', enabled: true },
  { name: 'Col 7', positions: [[0,6],[1,6],[2,6]], description: 'Reel 7', direction: 'vertical', enabled: true },
  { name: 'Top', positions: [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6]], description: 'Top row', direction: 'horizontal', enabled: true },
  { name: 'Mid', positions: [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6]], description: 'Middle row', direction: 'horizontal', enabled: true },
  { name: 'Bot', positions: [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6]], description: 'Bottom row', direction: 'horizontal', enabled: true },
  { name: 'D1', positions: [[0,0],[1,1],[2,2]], description: 'Diag down A', direction: 'diagonal', enabled: true },
  { name: 'D2', positions: [[0,1],[1,2],[2,3]], description: 'Diag down B', direction: 'diagonal', enabled: true },
  { name: 'D3', positions: [[0,2],[1,3],[2,4]], description: 'Diag down C', direction: 'diagonal', enabled: true },
  { name: 'D4', positions: [[0,3],[1,4],[2,5]], description: 'Diag down D', direction: 'diagonal', enabled: true },
  { name: 'D5', positions: [[0,4],[1,5],[2,6]], description: 'Diag down E', direction: 'diagonal', enabled: true },
  { name: 'U1', positions: [[2,0],[1,1],[0,2]], description: 'Diag up A', direction: 'diagonal', enabled: true },
  { name: 'U2', positions: [[2,1],[1,2],[0,3]], description: 'Diag up B', direction: 'diagonal', enabled: true },
  { name: 'U3', positions: [[2,2],[1,3],[0,4]], description: 'Diag up C', direction: 'diagonal', enabled: true },
  { name: 'U4', positions: [[2,3],[1,4],[0,5]], description: 'Diag up D', direction: 'diagonal', enabled: true },
  { name: 'U5', positions: [[2,4],[1,5],[0,6]], description: 'Diag up E', direction: 'diagonal', enabled: true },
]

const scatter = {
  enabled: false,
  freeSpinsEnabled: false,
  symbol: 'diamond',
  description: 'diamond appears anywhere on the grid',
  freeSpinAwards: [
    { count: 3, award: 5 }, { count: 4, award: 8 },
    { count: 5, award: 15 }, { count: 6, award: 20 }, { count: 7, award: 30 },
  ],
  payouts: [
    { count: 3, multiplier: 3 }, { count: 4, multiplier: 8 },
    { count: 5, multiplier: 15 }, { count: 6, multiplier: 30 }, { count: 7, multiplier: 100 },
  ],
}

const miniGame = {
  enabled: false,
  symbol: 'star',
  triggerCount: 3,
  description: '3+ stars triggers the roulette bonus',
  segments: [
    { multiplier: 2, color: '#4CAF50' },
    { multiplier: 3, color: '#2196F3' },
    { multiplier: 2, color: '#4CAF50' },
    { multiplier: 5, color: '#9C27B0' },
    { multiplier: 3, color: '#2196F3' },
    { multiplier: 8, color: '#FF9800' },
    { multiplier: 2, color: '#4CAF50' },
    { multiplier: 10, color: '#f44336' },
    { multiplier: 3, color: '#2196F3' },
    { multiplier: 5, color: '#9C27B0' },
    { multiplier: 2, color: '#4CAF50' },
    { multiplier: 15, color: '#FFD700' },
  ],
}

const jackpot = {
  enabled: true,
  forceJackpot: false,
  pattern: ['K','B','C','G','A','M','E'],
  row: 1,
  potAmount: '$200000',
  description: 'Middle row spells K-B-C-G-A-M-E',
}

function doSpin(forceJackpot: boolean) {
  const stopPositions = reels.map(reel => randomInt(reel.length))

  const grid = Array.from({ length: 3 }, (_, row) =>
    Array.from({ length: 7 }, (_, col) =>
      reels[col][(stopPositions[col] + row) % reels[col].length]
    )
  )

  const winningLines: any[] = []
  let totalMultiplier = 0

  for (const line of paylines.filter(l => l.enabled)) {
    const symbols = line.positions.map(([r, c]) => grid[r][c])
    if (symbols.every(s => s === symbols[0])) {
      const multiplier = MULTIPLIERS[symbols[0]]
      winningLines.push({
        name: line.name, symbol: symbols[0], multiplier,
        positions: line.positions, description: line.description,
        direction: line.direction, enabled: line.enabled,
      })
      totalMultiplier += multiplier
    }
  }

  if (scatter.enabled) {
    const scatterCount = grid.flat().filter(s => s === scatter.symbol).length
    const payout = scatter.payouts.filter(p => scatterCount >= p.count).pop()
    if (payout) {
      const scatterPositions: [number, number][] = []
      for (let r = 0; r < 3; r++)
        for (let c = 0; c < 7; c++)
          if (grid[r][c] === scatter.symbol) scatterPositions.push([r, c])
      winningLines.push({
        name: 'Scatter', symbol: scatter.symbol, multiplier: payout.multiplier,
        count: scatterCount, positions: scatterPositions,
        description: scatter.description, direction: 'scatter', enabled: scatter.enabled,
      })
      totalMultiplier += payout.multiplier
    }
  }

  let freeSpinsAwarded = 0
  if (scatter.enabled && scatter.freeSpinsEnabled) {
    const scatterCount = grid.flat().filter(s => s === scatter.symbol).length
    const award = scatter.freeSpinAwards.filter(a => scatterCount >= a.count).pop()
    if (award) freeSpinsAwarded = award.award
  }

  let miniGameTriggered = false
  if (miniGame.enabled) {
    const starCount = grid.flat().filter(s => s === miniGame.symbol).length
    if (starCount >= miniGame.triggerCount) {
      miniGameTriggered = true
      const starPositions: [number, number][] = []
      for (let r = 0; r < 3; r++)
        for (let c = 0; c < 7; c++)
          if (grid[r][c] === miniGame.symbol) starPositions.push([r, c])
      winningLines.push({
        name: 'Bonus', symbol: miniGame.symbol, multiplier: 0,
        count: starCount, positions: starPositions,
        description: miniGame.description, direction: 'scatter', enabled: miniGame.enabled,
      })
    }
  }

  if ((forceJackpot || jackpot.forceJackpot) && jackpot.enabled) {
    for (let c = 0; c < 7; c++) grid[jackpot.row][c] = jackpot.pattern[c]
  }

  let jackpotTriggered = false
  if (jackpot.enabled) {
    const middleRow = grid[jackpot.row]
    if (middleRow.every((s, i) => s === jackpot.pattern[i])) {
      jackpotTriggered = true
      winningLines.push({
        name: 'Jackpot', symbol: 'jackpot', multiplier: 0,
        potAmount: jackpot.potAmount,
        positions: jackpot.pattern.map((_, i) => [jackpot.row, i]),
        description: jackpot.description, direction: 'horizontal', enabled: jackpot.enabled,
      })
    }
  }

  return {
    stopPositions, grid, winningLines, totalMultiplier,
    isWinner: winningLines.length > 0, freeSpinsAwarded,
    miniGameTriggered, jackpotTriggered,
    jackpotPot: jackpot.potAmount, jackpotEnabled: jackpot.enabled,
  }
}

export default class SlotMachineController {

  async getOngoingEvent({}: HttpContext) {
    const e_ = await EventConfiguration.query().where('isActive', true).first();
    return {
      events: e_,
    }
  }

  async getAuthUser({ authUser }: HttpContext) {
    return collect(authUser).only(['success','uidx', 'nick', 'balance', 'credit']).all()
  }

  spin({ request }: HttpContext) {
    const forceJackpot = request.input('forceJackpot') === 'true'
    return doSpin(forceJackpot)
  }

  minigame({ }: HttpContext) {
    const winningIndex = randomInt(miniGame.segments.length)
    return { segments: miniGame.segments, winningIndex }
  }

  configJackpot({ request }: HttpContext) {
    const allowed = ['enabled', 'forceJackpot', 'potAmount', 'pattern', 'row']
    for (const key of allowed) {
      if (key in request.body()) {
        ;(jackpot as any)[key] = request.body()[key]
      }
    }
    return { jackpot }
  }
}
