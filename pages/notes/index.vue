<template>
  <v-container>
    <v-row class="my-4" no-gutters>
      <p class="text-h4">docs</p>
      <v-spacer></v-spacer>
      <v-btn style="text-transform:none;" to="/notes/new">
        <v-icon>mdi-pen</v-icon>
        New
      </v-btn>
    </v-row>
    <v-table fixed-header class="ma-2">
      <tbody>
        <tr v-for="doc in docs" :key="doc.id" class="ma-2 pa-2">
          <td>
            <v-row no-gutters>
              <span class="mx-2">更新日:</span>
            </v-row>
            <div class="d-flex flex-row">
              <v-btn class="me-auto" style="text-transform:none;" :to="'/notes/' + doc.id" variant="plain">{{ doc.title }}</v-btn>
              <v-btn class="rounded-0" @click="onDelete(doc.id)" variant="plain" rounded="0">
                <v-icon>
                  mdi-delete-outline
                </v-icon>
              </v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>
<script setup lang="ts">
// composable
const {listDoc, deleteDoc} = useTokenlessApi()
// provide
const {$logger} = useNuxtApp()

const docs:Ref<Document[]> = ref((await listDoc()).map(d => {
  return {
    id: d.document_id,
    title: d.title
  }
}))

const updateList = async () => {
  docs.value = (await listDoc()).map(d => {
    return {
      id: d.document_id,
      title: d.title
    }
  })
}

const onDelete = async (document_id: string) => {
  try{
    await deleteDoc(document_id)

    await updateList()
  }catch (e){
    const err = e as Error
    $logger.error(err.message, err)
  }
}

</script>
<script lang="ts">
interface Document {
  id: string
  title: string
}
definePageMeta({
  layout: 'main'
})
</script>
<style>
</style>