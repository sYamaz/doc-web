<template>
  <v-container fluid>
    <p class="title">Doc web</p>
    <v-text-field v-model="id" label="email" type="email" class="my-4" hide-details></v-text-field>
    <v-text-field v-model="pass" label="password" type="password" class="my-4" hide-details></v-text-field>
    <v-row no-gutters>
      <v-btn variant="plain" class="mx-auto btn-no-caps">Forget your password</v-btn>
    </v-row>
    <v-btn block class="my-4 btn-no-caps" @click="onSignIn">Sign in</v-btn>
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
// composables

import logger from '~~/plugins/logger';
const {signIn} = useTokenlessApi()
// provide
const {$logger} = useNuxtApp()

const id = ref('')
const pass = ref('')
const isErr = ref(false)
const errorMessage = ref('')

const onSignIn = async () => {
  try{
    await signIn(id.value, pass.value)

    updateError(undefined, isErr, errorMessage)
    navigateTo('/notes/')
  }catch(e){
    const err = e as Error
    updateError(err, isErr, errorMessage)
    $logger.error(err.message, err)
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