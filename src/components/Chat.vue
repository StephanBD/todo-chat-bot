<template>
  <v-card class="mx-auto" max-width="500">
    <h1>CHAT</h1>
    <v-toolbar color="transparent">
      <v-toolbar-title>Chat</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-card-text class="overflow-y-auto" style="height: 400px">
      <div v-for="(message, i) in messages" :key="i">
        <div
          :class="['d-flex', 'mb-4', message.author === 'bot' ? 'flex-row' : 'flex-row-reverse']"
        >
          <v-avatar class="mx-2">
            <v-img :src="message.avatar" alt="Avatar"></v-img>
          </v-avatar>
          <v-card :color="message.author === 'bot' ? 'grey-lighten-3' : 'primary'" class="pa-3">
            <v-card-text class="text-white">{{ message.text }}</v-card-text>
            <div v-if="message.card">
              <v-btn
                :href="message.card.url"
                target="_blank"
                color="white"
                variant="outlined"
                class="mt-2"
              >
                View Task
              </v-btn>
            </div>
          </v-card>
        </div>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-text-field
        v-model="newMessage"
        label="Type a message..."
        variant="solo"
        @keydown.enter="sendMessage"
      >
        <template v-slot:append-inner>
          <v-btn icon="mdi-send" variant="text" @click="sendMessage"></v-btn>
        </template>
      </v-text-field>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useChatStore } from '@/stores/chat'
import axios from 'axios'

const chatStore = useChatStore()
const messages = chatStore.messages

const newMessage = ref('')

const sendMessage = async () => {
  if (newMessage.value) {
    const userMessage = {
      id: messages.length + 1,
      author: 'user',
      avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
      text: newMessage.value,
    }
    chatStore.addMessage(userMessage)

    const webhookUrl = 'https://n8n.opperweb.com/webhook/0d643ef6-d50d-47ba-8a65-152048d79a3e'
    try {
      const response = await axios.post(webhookUrl, { message: newMessage.value })
      const botResponse = response.data

      if (botResponse.response) {
        chatStore.addMessage({
          id: messages.length + 1,
          author: 'bot',
          avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
          text: botResponse.response,
        })
      } else if (botResponse.cardId) {
        chatStore.addMessage({
          id: messages.length + 1,
          author: 'bot',
          avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
          text: `Task created: ${botResponse.cardName}`,
          card: botResponse,
        })
      } else if (botResponse.error) {
        chatStore.addMessage({
          id: messages.length + 1,
          author: 'bot',
          avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
          text: `Error: ${botResponse.error}`,
        })
      }
    } catch (error) {
      console.error('Error calling webhook:', error)
      chatStore.addMessage({
        id: messages.length + 1,
        author: 'bot',
        avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
        text: 'Sorry, something went wrong.',
      })
    }

    newMessage.value = ''
  }
}
</script>
