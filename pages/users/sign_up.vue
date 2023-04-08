<template>
  <v-container fluid>
    <p class="title">Doc web</p>
    <v-alert :closable="true">{{ errorMessage }}</v-alert>
    <v-text-field label="email" type="email" v-model="id" class="my-4" hide-details></v-text-field>
    <v-text-field label="password" type="password" v-model="pass" class="my-4" hide-details></v-text-field>
    <v-btn block class="my-4 btn-no-caps" @click="onSignUp">Register</v-btn>
  </v-container>
</template>
<script setup lang="ts">
// composables
const {signUp, signIn} = useTokenlessApi()
// provides
const {$logger} = useNuxtApp()
const id = ref('')
const pass = ref('')
const errorMessage = ref('')
const isError = ref(false)

const onSignUp = async (arg:any) => {
  try{
    // sign up
    await signUp(id.value, pass.value)
    updateError(undefined, isError, errorMessage)

    // sign in
    await signIn(id.value, pass.value)

    // navigate to home
    navigateTo('/notes/')

  } catch (e) {
    const err = e as Error
    updateError(err, isError, errorMessage)
    $logger.error(e)
    return
  }
}

const updateError = (err: Error | undefined = undefined, errFlag: Ref<boolean>, errMessage: Ref<string>) => {
  if (err === null || (typeof err === 'undefined')) {
    errMessage.value = ''
    errFlag.value = false
  } else {
    errMessage.value = err.message
    errFlag.value = true
  }
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