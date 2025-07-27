<template>
  <div>
    <v-card class="mx-auto" max-width="500">
      <v-toolbar color="transparent">
        <v-toolbar-title>Todo List</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card-text>
        <v-text-field
          v-model="task"
          label="What are you working on?"
          variant="solo"
          @keydown.enter="create"
        >
          <template v-slot:append-inner>
            <v-fade-transition>
              <v-btn
                v-show="task"
                icon="mdi-plus-circle"
                variant="text"
                @click="create"
              ></v-btn>
            </v-fade-transition>
          </template>
        </v-text-field>

        <h2 class="text-h4 text-success ps-4">
          Tasks:&nbsp;
          <v-fade-transition leave-absolute>
            <span :key="`tasks-${tasks.length}`">
              {{ tasks.length }}
            </span>
          </v-fade-transition>
        </h2>

        <v-divider class="mt-4"></v-divider>

        <v-row align="center" class="my-1">
          <v-col cols="auto">
            <strong class="mx-4">Remaining: {{ remainingTasks }}</strong>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="auto">
            <strong class="mx-4">Completed: {{ completedTasks }}</strong>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-progress-circular
              v-model="progress"
              class="me-2"
            ></v-progress-circular>
          </v-col>
        </v-row>

        <v-divider class="mb-4"></v-divider>

        <v-card v-if="tasks.length > 0">
          <v-slide-y-transition class="py-0" group tag="v-list">
            <template v-for="(task, i) in tasks" :key="`${i}-${task.text}`">
              <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

              <v-list-item @click="task.done = !task.done">
                <template v-slot:prepend>
                  <v-checkbox-btn
                    v-model="task.done"
                    color="grey"
                  ></v-checkbox-btn>
                </template>

                <v-list-item-title>
                  <span :class="task.done ? 'text-grey' : 'text-primary'">
                    {{ task.text }}
                  </span>
                </v-list-item-title>

                <template v-slot:append>
                  <v-expand-x-transition>
                    <v-icon v-if="task.done" color="success">
                      mdi-check
                    </v-icon>
                  </v-expand-x-transition>
                </template>
              </v-list-item>
            </template>
          </v-slide-y-transition>
        </v-card>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const tasks = ref([
  { text: 'Buy milk', done: false },
  { text: 'Clean room', done: false },
  { text: 'Call mom', done: true },
])

const task = ref('')

const completedTasks = computed(() => tasks.value.filter((task) => task.done).length)
const progress = computed(() => (completedTasks.value / tasks.value.length) * 100)
const remainingTasks = computed(() => tasks.value.length - completedTasks.value)

const create = () => {
  if (task.value) {
    tasks.value.push({
      text: task.value,
      done: false,
    })
    task.value = ''
  }
}
</script>
