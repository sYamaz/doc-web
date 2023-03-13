<template>
  <v-row no-gutters>
    <v-text-field label="title" v-model="title" class="mx-2" density="compact"></v-text-field>
    <v-btn class="ml-auto" @click="save">Save</v-btn>
  </v-row>
  <codemirror v-model="code" placeholder="Code goes hear..." :style="{ height: '100%'}" :autofocus="true"
    :indent-with-tab="true" :tab-size="2" :extensions="extensions" @ready="handleReady" />
</template>
<script setup lang="ts">
const title = ref('')
const code = ref('')
const extensions = [markdown(), oneDark]

// codemirror editorView instance ref
const view = shallowRef()
const handleReady = (payload: any) => {
  view.value = payload.vue
}

// // Status is available at all times via Codemirror EditorView
// const getCodemirrorStates = () => {
//   const state = view.value.state
//   const ranges = state.selection.ranges
//   const selected = ranges.reduce((r, range) => r + range.to - range.from, 0)
//   const cursor = ranges[0].anchor
//   const length = state.doc.length
//   const lines = state.doc.lines
//   // more state info ...
//   // return ...
// }

const save = (arg: any) => {
  // postObj
  const obj = {
    title: title.value,
    body: code.value
  }

  fetch('http://localhost:8888/docs', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj)
  })
}

</script>
<script lang="ts">
import { Codemirror } from 'vue-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'
import { stringLiteral } from '@babel/types';
definePageMeta({
  layout: 'main'
})
</script>