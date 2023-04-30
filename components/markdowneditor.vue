<template>
  <v-container id="editor_component" fluid class="pa-0">
    <v-row style="height:100%;" no-gutters>
      <v-col v-if="editorVisible" :cols="editorCols" style="height:100%">
        <v-container fluid class="pa-0 ma-0" style="height:100%; width:100%;">
          <editor class="md_editor" style="height:100%;" :modelValue="code" @update:model-value="onChanged"></editor>
        </v-container>
      </v-col>
      <v-col v-if="previewVisible" :cols="previewCols">
        <markdownpreview :markdownCode="code"></markdownpreview>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
export type Layout = 'editor-only' | 'preview-only' | 'side-by-side'

interface Props {
  modelValue: string
  layout: Layout
}
const props = defineProps<Props>()
const emits = defineEmits<{ (e: 'update:modelValue', value?: string): void }>()

const wProps = toRefs(props)

const editorVisible = computed(() => {
  switch (wProps.layout.value) {
    case 'editor-only':
      return true
    case 'preview-only':
      return false
    case 'side-by-side':
      return true
  }
})

const editorCols = computed(() => {
  switch (wProps.layout.value) {
    case 'editor-only':
      return 12
    case 'preview-only':
      return 0
    case 'side-by-side':
      return 6
  }
})

const previewVisible = computed(() => {
  switch (wProps.layout.value) {
    case 'editor-only':
      return false
    case 'preview-only':
      return true
    case 'side-by-side':
      return true
  }
})

const previewCols = computed(() => {
  switch (wProps.layout.value) {
    case 'editor-only': 
      return 0
    case 'preview-only': 
      return 12
    case 'side-by-side': 
      return 6
  }
})

// provide
const { $logger } = useNuxtApp()

const code = ref(props.modelValue)

// code changed
const onChanged = (value: string | undefined) => {
  code.value = value!
  emits('update:modelValue', value)
}

</script>
<script lang="ts">
</script>
<style lang="scss" scoped>
.md_editor {}

.md_preview {
  height: 100%;
}
</style>