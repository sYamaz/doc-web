<template>
  <v-container class="ma-0 pa-0 d-flex flex-column" style="height:100%;" fluid>
  <v-row class="flex-grow-0" no-gutters>
    <v-text-field label="title" v-model="title" class="mx-2" density="compact"></v-text-field>
    <v-btn class="ml-auto" @click="save">Save</v-btn>
  </v-row>
  <editor class="flex-grow-1" :modelValue="code" @update:model-value="onUpdated"></editor>
</v-container>
</template>
<script setup lang="ts">
// composables
const {saveDoc} = useTokenlessApi()
// provide
const {$logger} = useNuxtApp()

const title = ref('')
const code = ref('')

const onUpdated = (newCode: string | undefined) => {
  code.value = newCode!
}

const save = async (arg: any) => {
  try{
    const newDocId = await saveDoc(title.value, code.value)

    navigateTo('/notes/'+newDocId)
  }catch(e){
    const err = e as Error
    $logger.error(err)
  }
}

</script>
<script lang="ts">
definePageMeta({
  layout: 'main'
})
</script>