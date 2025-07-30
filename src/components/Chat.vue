<template>
  <v-container class="fill-height">
    <v-row class="align-center justify-center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-toolbar color="transparent">
            <v-toolbar-title>Chat</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="clearChat">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text class="overflow-y-auto" style="height: 400px">
            <div v-for="(message, i) in messages" :key="i">
              <div
                :class="[
                  'd-flex',
                  'mb-4',
                  message.author === 'bot' ? 'flex-row' : 'flex-row-reverse',
                ]"
              >
                <v-avatar class="mx-2">
                  <v-img :src="message.avatar" alt="Avatar"></v-img>
                </v-avatar>
                <v-card
                  :color="message.author === 'bot' ? 'grey-lighten-3' : 'primary'"
                  class="pa-3"
                >
                  <v-card-text :class="[message.author === 'bot' ? 'text-black' : 'text-white']">{{ message.text }}</v-card-text>
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
              :loading="loading"
              :disabled="loading"
            >
              <template v-slot:append-inner>
                <v-btn
                  icon="mdi-send"
                  variant="text"
                  @click="sendMessage"
                  :disabled="loading"
                ></v-btn>
              </template>
            </v-text-field>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useChatStore } from '@/stores/chat'
import { storeToRefs } from 'pinia'
import axios from 'axios'

const chatStore = useChatStore()
const { messages, sessionId } = storeToRefs(chatStore)

onMounted(() => {
  chatStore.initializeSession()
})

const newMessage = ref('')
const loading = ref(false)

const sendMessage = async () => {
  if (loading.value) return
  if (newMessage.value) {
    const userMessage = {
      id: messages.value.length + 1,
      author: 'user',
      avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
      text: newMessage.value,
    }
    chatStore.addMessage(userMessage)
    chatStore.invalidateTasks()

    loading.value = true

    const webhookUrl = import.meta.env.VITE_WEBHOOK_URL
    try {
      const response = await axios.post(
        webhookUrl,
        { message: newMessage.value, sessionId: sessionId.value },
        {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
          },
        }
      )
      const botResponse = response.data

      if (botResponse.response) {
        chatStore.addMessage({
          id: messages.value.length + 1,
          author: 'bot',
          avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
          text: botResponse.response,
        })
      } else if (botResponse.cardId) {
        chatStore.addMessage({
          id: messages.value.length + 1,
          author: 'bot',
          avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
          text: `Task created: ${botResponse.cardName}`,
          card: botResponse,
        })
      } else if (botResponse.error) {
        chatStore.addMessage({
          id: messages.value.length + 1,
          author: 'bot',
          avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
          text: `Error: ${botResponse.error}`,
        })
      }
    } catch (error) {
      console.error('Error calling webhook:', error)
      chatStore.addMessage({
        id: messages.value.length + 1,
        author: 'bot',
        avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
        text: 'Sorry, something went wrong.',
      })
    } finally {
      loading.value = false
    }

    newMessage.value = ''
  }
}

const clearChat = () => {
  chatStore.clearChat()
}
</script>
