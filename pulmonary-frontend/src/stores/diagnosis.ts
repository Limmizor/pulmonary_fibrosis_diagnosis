import { defineStore } from 'pinia'

export const useDiagnosisStore = defineStore('diagnosis', {
  state: () => ({
    currentCaseId: null as number | null,
    diagnosisResult: null as any
  }),
  actions: {
    setCurrentCase(id: number) {
      this.currentCaseId = id
    }
  }
})