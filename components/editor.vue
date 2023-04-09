<template>
  <v-container fluid style="height:100%; flex-direction: column;" class="pa-0 d-flex">
    <v-row style="flex: 1;" no-gutters>
      <v-col cols="6" style="">
        <codemirror class="md-editor" v-model="code" placeholder="Code goes hear..."
          :style="{ backgroundColor: 'gray' }" :autofocus="true" :indent-with-tab="true" :tab-size="2"
          :extensions="extensions" @ready="handleReady" @change="onChanged" />
      </v-col>
      <v-col>
        <div class="markdown md-preview" v-html="md"></div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
interface Props{
  modelValue:string
}
const props = defineProps<Props>()
const emits = defineEmits<{(e: 'update:modelValue', value?: string):void}>()

// provide
const {$logger} = useNuxtApp()

const md = ref(marked.parse(props.modelValue))

const code = ref(props.modelValue)
const extensions = [markdown(), oneDark]

// codemirror editorView instance ref
const view = shallowRef()
const handleReady = (payload: any) => {
  view.value = payload.vue
}

// code changed
const onChanged = (value:string, viewUpdate:ViewUpdate) => {
  md.value = marked.parse(value)
  emits('update:modelValue', value)
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

</script>
<script lang="ts">
import { Codemirror } from 'vue-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'
import { Renderer, marked } from 'marked'
import { ViewUpdate } from '@codemirror/view';
</script>
<style lang="scss" scoped>
$utilities: false;
.md-editor {
  height: 100%;
}

.md-preview {
  height: 100%;
}
</style>