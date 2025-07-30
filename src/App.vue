<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Todo Chat Bot</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/">Chat</v-btn>
      <v-btn to="/tasks">Tasks</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
//
</script>
