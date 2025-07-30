import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [
      {
        id: 1,
        author: 'bot',
        avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
        text: 'Hello! How can I help you today?',
      },
    ],
    sessionId: localStorage.getItem('sessionId') || uuidv4(),
    tasks: [],
    tasksLoaded: false,
  }),
  actions: {
    addMessage(message) {
      this.messages.push(message)
    },
    initializeSession() {
      if (!localStorage.getItem('sessionId')) {
        localStorage.setItem('sessionId', this.sessionId)
      }
    },
    clearChat() {
      this.messages = [
        {
          id: 1,
          author: 'bot',
          avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
          text: 'Hello! How can I help you today?',
        },
      ]
      this.sessionId = uuidv4()
      localStorage.setItem('sessionId', this.sessionId)
      this.tasksLoaded = false
    },
    setTasks(tasks) {
      this.tasks = tasks
      this.tasksLoaded = true
    },
    invalidateTasks() {
      this.tasksLoaded = false
    },
  },
})

