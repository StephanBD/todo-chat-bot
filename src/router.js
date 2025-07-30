import { createRouter, createWebHistory } from 'vue-router'
import Chat from '@/components/Chat.vue'
import Tasks from '@/views/Tasks.vue'

const routes = [
  {
    path: '/',
    name: 'Chat',
    component: Chat,
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
