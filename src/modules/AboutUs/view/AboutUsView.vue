<template>
  <div class="container mx-auto py-8">
    <LanguageSwitcher class="mb-4" />
    <div v-if="loading" class="py-8 text-center">
      <ProgressSpinner />
    </div>
    <div v-else>
      <AboutHighlight :title="aboutUs.title" :texts="aboutUs.texts" />
      <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAboutUsStore } from '@/modules/AboutUs/store/aboutus.store'
import { computed, onMounted } from 'vue'
import AboutHighlight from '@/modules/AboutUs/components/AboutHighlight.vue'
import LanguageSwitcher from '@/modules/i18n/components/LanguageSwitcher.vue'
import ProgressSpinner from 'primevue/progressspinner'

const store = useAboutUsStore()
const aboutUs = computed(() => store.aboutUs)
const loading = computed(() => store.loading)
const error = computed(() => store.error)

onMounted(async () => {
  // await store.fetchAboutUs()
})
</script>
