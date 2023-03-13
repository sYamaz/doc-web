<template>
  <v-app :theme="theme">
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
  name: 'DefaultLayout'
})
</script>
<style></style>