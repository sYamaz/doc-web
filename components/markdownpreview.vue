<template>
  <div id="preview" class="markdown" v-html="wHTML">
  </div>
</template>
<script setup lang="ts">
type Props = {
  markdownCode:string
}
const props = defineProps<Props>()
const watchableProps = toRefs(props)

class CustomRenderer extends Renderer {
  constructor(options:marked.MarkedOptions | undefined){
    super(options)
  }

  
}

marked.use({
  headerPrefix: '',
  highlight: function(code, lang) {
    console.log(lang)
    return hljs.highlightAuto(code, [lang]).value
  },
  renderer: {
  table(header:string, body:string):string {
    return `<div class="v-table v-theme--light v-table--density-default">
                <div class="v-table__wrapper">
                  <table>
                    <thead>${header}</thead>
                    <tbody>${body}</tbody>
                  </table>
                </div>
              </div>`
  },
  tablerow(content:string):string {
    return content
  },
  tablecell(content:string, flags: { header: boolean; align: 'center' | 'left' | 'right' | null; }): string {
    if(flags.header) {
      return `<th>${content}</th>`
    }
    else {
      return `<td>${content}</td>`
    }
  },
  heading(text:string, level: 1 | 2 | 3 | 4 | 5 | 6, raw: string, slugger: marked.Slugger) {
    return `<h${level} class="text-h${level}">${text}</h1>`
  },
  list(body:string, ordered:boolean, start:number):string {
    // return `<div class="v-list v-theme--light v-list--density-default v-list--one-line" role="listbox">${body}</div>`
    return `<ul>${body}</ul>`
  },
  listitem(text:string, task:boolean, checked:boolean):string {
    return `<li>${text}</li>`
    // return `<div class="v-list-item v-theme--light v-list-item--density-compact v-list-item--one-line v-list-item--variant-text">
              
    //           <span class="v-list-item__content">${text}</span>
    //         </div>`
  },
  code(code:string, language:string, isEscaped:boolean): string {
      const value = hljs.highlightAuto(code, [language])
      console.log(value)
      return `<pre>${value.value}</pre>`
  },
}})

const wHTML = computed(() => {
  return marked.parse(watchableProps.markdownCode.value)
})

</script>
<script lang="ts">
import { marked, Renderer } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/scss/github.scss'
</script>
<style scoped lang="scss">
ul li::marker {
  list-style-type: unset !important;
  color: black;
  font-size: 1.5rem
}
#preview {
  li {
    list-style-type: disc;
  }

  ::marker {
    color: black;
    font-size: 1.2em;
  }
}
</style>