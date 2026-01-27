<script setup></script>

<template>
  <nav>
    <router-link :to="{ name: 'home' }">Home</router-link>
    <router-link :to="{ name: 'players' }">Players</router-link>
    <router-link :to="{ name: 'players', params: { playerName: 'examplename' } }"
      >Example player</router-link
    >
  </nav>
  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
}
</style>
