<template>
  <v-btn @click="onClick">
    <v-icon :icon="icon">
    </v-icon>
  </v-btn>
</template>
<script setup lang="ts">
import { Layout } from '~~/components/markdowneditor.vue';

type Props = {
  modelValue: Layout
}
const props = defineProps<Props>()
const emits = defineEmits<{(e: 'update:modelValue', value?: Layout): void}>()

const wProps = toRefs(props)
const icon = computed(() => {
  switch(wProps.modelValue.value){
    case 'editor-only':
      return 'mdi-eye-off-outline'
    case 'preview-only':
      return 'mdi-eye-outline'
    case 'side-by-side':
      return 'mdi-arrow-split-vertical'
  }
})

const onClick = () => {
  console.log('clock')
  switch(props.modelValue)
  {
    case 'editor-only':
      emits('update:modelValue', 'preview-only')
      return;
    case 'preview-only':
      emits('update:modelValue', 'side-by-side')
      return;
    case 'side-by-side':
    emits('update:modelValue', 'editor-only')
      return;
  }
}

</script>
<script>
</script>