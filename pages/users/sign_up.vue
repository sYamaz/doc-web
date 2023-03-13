<template>
  <v-container fluid>
    <p class="title">Doc web</p>
    <v-text-field label="email" type="email" v-model="id" class="my-4" hide-details></v-text-field>
    <v-text-field label="password" type="password" v-model="pass" class="my-4" hide-details></v-text-field>
    <v-btn block class="my-4 btn-no-caps" @click="signUp">Register</v-btn>
  </v-container>
</template>
<script setup lang="ts">
const id = ref('')
const pass = ref('')

const signUp = (arg:any) => {
  
}
</script>
<script lang="ts">
definePageMeta({
  layout: 'default'
})
</script>
<style>
.title {
  text-align: center;
  font-size: 2.3rem;
}

.btn-no-caps {
  text-transform: none;
}
</style>