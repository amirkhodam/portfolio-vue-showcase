<script setup lang="ts">
import { ref, watch, computed } from 'vue'
const props = defineProps<{ portfolio?: any }>()
const emit = defineEmits(['save', 'close'])

const form = ref({
  id: '',
  title: { en: '', fr: '' },
  images: [],
  videos: [],
  texts: { en: [''], fr: [''] },
})

watch(
  () => props.portfolio,
  (val) => {
    if (val) form.value = { ...val }
    else
      form.value = {
        id: '',
        title: { en: '', fr: '' },
        images: [],
        videos: [],
        texts: { en: [''], fr: [''] },
      }
  },
  { immediate: true },
)

function save() {
  emit('save', { ...form.value })
}
function close() {
  emit('close')
}
</script>
<template>
  <div class="p-4">
    <h3 class="mb-2 text-lg font-bold">{{ form.id ? 'Edit Portfolio' : 'Add Portfolio' }}</h3>
    <div class="mb-2">
      <label>Title (EN)</label>
      <input v-model="form.title.en" class="w-full rounded border px-2 py-1" />
    </div>
    <div class="mb-2">
      <label>Title (FR)</label>
      <input v-model="form.title.fr" class="w-full rounded border px-2 py-1" />
    </div>
    <div class="mb-2">
      <label>Texts (EN)</label>
      <textarea v-model="form.texts.en[0]" class="w-full rounded border px-2 py-1" />
    </div>
    <div class="mb-2">
      <label>Texts (FR)</label>
      <textarea v-model="form.texts.fr[0]" class="w-full rounded border px-2 py-1" />
    </div>
    <div class="mt-4 flex gap-2">
      <button @click="save" class="bg-primary rounded px-4 py-2 text-white">Save</button>
      <button @click="close" class="rounded bg-gray-300 px-4 py-2">Cancel</button>
    </div>
  </div>
</template>
