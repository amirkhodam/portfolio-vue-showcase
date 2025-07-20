<template>
  <div class="container mx-auto py-8">
    <LanguageSwitcher class="mb-4" />
    <div v-if="loading" class="py-8 text-center">
      <ProgressSpinner />
    </div>
    <div v-else>
      <ContactForm @submit="submitForm" />
      <div v-if="success" class="mt-4 text-green-600">{{ $t('contact.success') }}</div>
      <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useContactStore } from '@/modules/Contact/store/contact.store'
import { computed, onMounted } from 'vue'
import ContactForm from '@/modules/Contact/components/ContactForm.vue'
import LanguageSwitcher from '@/modules/i18n/components/LanguageSwitcher.vue'
import ProgressSpinner from 'primevue/progressspinner'

const store = useContactStore()
const loading = computed(() => store.loading)
const error = computed(() => store.error)
const success = computed(() => store.success)

function submitForm(form: any) {
  store.submitContactForm(form)
}

onMounted(async () => {
  // await store.fetchContactInfo()
})
</script>
