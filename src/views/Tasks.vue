<template>
  <v-container>
    <v-row>
      <v-col v-for="task in tasks" :key="task.id" cols="12" sm="6" md="4">
        <v-card>
          <v-card-title>{{ task.name }}</v-card-title>
          <v-card-actions>
            <v-btn :href="task.url" target="_blank">View on Trello</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="red" @click="deleteTask(task.id)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { useChatStore } from '@/stores/chat'

const tasks = ref([])
const chatStore = useChatStore()

const fetchTasks = async () => {
  if (chatStore.tasksLoaded) {
    tasks.value = chatStore.tasks
    return
  }

  const apiKey = import.meta.env.VITE_TRELLO_API_KEY
  const token = import.meta.env.VITE_TRELLO_TOKEN
  const listId = '688637418b2a76cb5df16d88'
  const url = `https://api.trello.com/1/lists/${listId}/cards?key=${apiKey}&token=${token}`

  try {
    const response = await axios.get(url)
    chatStore.setTasks(response.data)
    tasks.value = response.data
  } catch (error) {
    console.error('Error fetching Trello tasks:', error)
  }
}

const deleteTask = async (taskId) => {
  const apiKey = import.meta.env.VITE_TRELLO_API_KEY
  const token = import.meta.env.VITE_TRELLO_TOKEN
  const url = `https://api.trello.com/1/cards/${taskId}?key=${apiKey}&token=${token}`

  try {
    await axios.delete(url)
    tasks.value = tasks.value.filter((task) => task.id !== taskId)
    chatStore.setTasks(tasks.value)
  } catch (error) {
    console.error('Error deleting Trello task:', error)
  }
}

onMounted(() => {
  fetchTasks()
})

watch(
  () => chatStore.tasksLoaded,
  (loaded) => {
    if (!loaded) {
      fetchTasks()
    }
  }
)
</script>
