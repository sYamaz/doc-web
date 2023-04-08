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
            <v-btn style="text-transform:none;" :to="'/notes/' + doc.id" variant="plain">{{ doc.title }}</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>
<script setup lang="ts">
const {listDoc} = useTokenlessApi()

const docs: Document[] = (await listDoc()).map(d => {
  return {
    id: d.document_id,
    title: d.title
  }
})
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
<style></style>