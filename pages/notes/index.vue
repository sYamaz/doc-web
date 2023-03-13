<template>
  <v-container>
    <v-row class="my-4" no-gutters>
      <p class="text-h4">docs</p>
      <v-spacer></v-spacer>
      <v-btn style="text-transform:none;">
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
            <v-btn :to="'notes/' + doc.id" variant="plain">{{ doc.title }}</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>
<script setup lang="ts">
const docs: Document[] = [
  {
    id: "aaaaaaaa",
    title: "title_A",
  },
  {
    id: "bbbbbbbb",
    title: "title_B",
  },
  {
    id: "cccccccc",
    title: "title_C",
  },
  {
    id: "dddddddd",
    title: "title_D",
  },
]
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