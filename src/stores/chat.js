import { defineStore } from 'pinia'

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
  }),
  actions: {
    addMessage(message) {
      this.messages.push(message)
    },
  },
})
