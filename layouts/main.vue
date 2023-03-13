<template>
  <v-app :theme="theme">
    <v-app-bar style="backdrop-filter: blur(10px);" :color="isDark() ? '#FFFFFF00' : '#FFFFFF10'" class="d-flex justify-center">
      <v-app-bar-title>
        doc-web
      </v-app-bar-title>
      <v-app-bar-nav-icon @click.stop="changeTheme(isDark() ? 'light' : 'dark')">
        <v-icon v-if="isDark()" icon="mdi-white-balance-sunny" />
        <v-icon v-else icon="mdi-weather-night" />
      </v-app-bar-nav-icon>
    </v-app-bar>
    <v-main>
      <NuxtPage></NuxtPage>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
const theme = ref('light')
const isDark = () => theme.value === 'dark'
const changeTheme = (mode: Mode) => { theme.value = mode }
</script>
<script lang="ts">
type Mode = 'dark' | 'light'
export default defineComponent({
  name: 'MainLayout'
})
</script>
<style></style>