<template>
  <v-container id="edit_container" class="pa-0 ma-0 d-flex flex-column" style="height:100%;" fluid>
    <v-row class="flex-grow-0" no-gutters>
      <h1>{{ title }}</h1>
      <v-btn @click="onSaved">save</v-btn>
      <v-btn to="/notes">close</v-btn>
    </v-row>
    <editor class="flex-grow-1" :modelValue="code" @update:modelValue="onUpdated"></editor>
  </v-container>
</template>
<script setup lang="ts">
// composable
const { getDoc, updateDoc } = useTokenlessApi()
const route = useRoute()
// provide
const { $logger } = useNuxtApp()

// urlからdocument_id取得
const document_id = route.params.id as string

const doc = await getDoc(document_id)
const title = ref(doc.title)
const code = ref(doc.body)

const onSaved = async () => {
  try {
    await updateDoc(document_id, title.value, code.value)
  } catch (e) {
    const err = e as Error
    $logger.error(err.message, err)
  }
}

const onUpdated = (newCode: string | undefined) => {
  code.value = newCode!
}

</script>
<script lang="ts">
definePageMeta({
  layout: 'main'
})
</script>