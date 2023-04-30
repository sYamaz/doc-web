<template>
  <codemirror class="md_editor" style="height:100%;" :model-value="props.modelValue" placeholder="Code goes hear..."
    :style="{ backgroundColor: 'gray' }" :autofocus="true" :indent-with-tab="true" :tab-size="2" :extensions="extensions"
    @ready="handleReady" @change="onChanged" />
</template>
<script setup lang="ts">
const extensions = [markdown(), oneDark]
const view = shallowRef()
const handleReady = (payload: any) => {
  view.value = payload.vue
}

type Props = {
  modelValue: string
}
const props = defineProps<Props>()

const emits = defineEmits<{ (e: 'update:modelValue', value?: string): void }>()
const onChanged = (value: string, viewUpdate: ViewUpdate) => {
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
import { ViewUpdate } from '@codemirror/view';
import { Layout } from '~~/components/markdowneditor.vue';
</script>