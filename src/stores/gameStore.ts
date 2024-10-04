import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    gamesWon: 0,
  }),
  actions: {
    incrementWins() {
      this.gamesWon++
    },
    resetWins() {
      this.gamesWon = 0
    },
  },
})