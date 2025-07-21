<template>
  <div>
    <h2 class="mb-4 text-xl font-bold">Edit Contact Us</h2>
    <form @submit.prevent="save">
      <div class="mb-2">
        <label>Email</label>
        <input v-model="form.email" class="w-full rounded border px-2 py-1" />
      </div>
      <div class="mb-2">
        <label>Phone</label>
        <input v-model="form.phone" class="w-full rounded border px-2 py-1" />
      </div>
      <div class="mb-2">
        <label>Address (EN)</label>
        <input v-model="form.address.en" class="w-full rounded border px-2 py-1" />
      </div>
      <div class="mb-2">
        <label>Address (FR)</label>
        <input v-model="form.address.fr" class="w-full rounded border px-2 py-1" />
      </div>
      <button type="submit" class="bg-primary rounded px-4 py-2 text-white">Save</button>
    </form>
    <div v-if="success" class="mt-4 text-green-600">Saved!</div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useContactStore } from '@/modules/Contact/store/contact.store'
const store = useContactStore()
const form = ref({
  email: '',
  phone: '',
  address: { en: '', fr: '' },
})
const success = ref(false)

// Initialize form with store data (mock for now)
form.value = {
  email: store.email || '',
  phone: store.phone || '',
  address: { en: store.address?.en || '', fr: store.address?.fr || '' },
}

function save() {
  store.email = form.value.email
  store.phone = form.value.phone
  store.address = { ...form.value.address }
  success.value = true
  setTimeout(() => (success.value = false), 2000)
}
</script>
