import { defineStore } from 'pinia'

export const useTaskDraftStore = defineStore('taskDraft', {
  state: () => ({
    title: '',
    description: '',
    priority: '',
  }),
})
