<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const emit = defineEmits(['submit'])
const { t } = useI18n()
const form = ref({ name: '', email: '', message: '' })
const errors = ref<{ [key: string]: string }>({})

function validate() {
  errors.value = {}
  if (!form.value.name) errors.value.name = t('contact.name_required')
  if (!form.value.email) errors.value.email = t('contact.email_required')
  if (!form.value.message) errors.value.message = t('contact.message_required')
  return Object.keys(errors.value).length === 0
}
function submit() {
  if (validate()) emit('submit', { ...form.value })
}
</script>
<template>
  <form @submit.prevent="submit" class="space-y-4">
    <div>
      <label class="block">{{ t('contact.name') }}</label>
      <input v-model="form.name" class="w-full rounded border px-2 py-1" />
      <div v-if="errors.name" class="text-sm text-red-500">{{ errors.name }}</div>
    </div>
    <div>
      <label class="block">{{ t('contact.email') }}</label>
      <input v-model="form.email" class="w-full rounded border px-2 py-1" />
      <div v-if="errors.email" class="text-sm text-red-500">{{ errors.email }}</div>
    </div>
    <div>
      <label class="block">{{ t('contact.message') }}</label>
      <textarea v-model="form.message" class="w-full rounded border px-2 py-1" />
      <div v-if="errors.message" class="text-sm text-red-500">{{ errors.message }}</div>
    </div>
    <button type="submit" class="bg-primary rounded px-4 py-2 text-white">
      {{ t('contact.submit') }}
    </button>
  </form>
</template>
