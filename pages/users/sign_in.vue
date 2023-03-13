<template>
  <v-container fluid>
    <p class="title">Doc web</p>
    <v-text-field label="email" type="email" class="my-4" hide-details></v-text-field>
    <v-text-field label="password" type="password" class="my-4" hide-details></v-text-field>
    <v-row no-gutters>
      <v-btn variant="plain" class="mx-auto btn-no-caps">Forget your password</v-btn>
    </v-row>
    <v-btn block class="my-4 btn-no-caps">Sign in</v-btn>
    <v-row no-gutters>
      <p class="mx-auto">
        Don't have an account yet?
      </p>
    </v-row>
    <v-row>
      <v-btn class="mx-auto btn-no-caps" variant="plain" to="./sign_up">Register now</v-btn>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
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