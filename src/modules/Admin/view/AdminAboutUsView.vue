<template>
  <div>
    <h2 class="mb-4 text-xl font-bold">Edit About Us</h2>
    <form @submit.prevent="save">
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
      <button type="submit" class="bg-primary rounded px-4 py-2 text-white">Save</button>
    </form>
    <div v-if="success" class="mt-4 text-green-600">Saved!</div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useAboutUsStore } from '@/modules/AboutUs/store/aboutus.store'
const store = useAboutUsStore()
const form = ref({
  title: { en: '', fr: '' },
  texts: { en: [''], fr: [''] },
})
const success = ref(false)

// Initialize form with store data
form.value = JSON.parse(JSON.stringify(store.aboutUs))

function save() {
  store.aboutUs.title = { ...form.value.title }
  store.aboutUs.texts = { ...form.value.texts }
  success.value = true
  setTimeout(() => (success.value = false), 2000)
}
</script>
