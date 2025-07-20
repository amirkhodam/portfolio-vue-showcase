<template>
  <div class="container mx-auto py-8">
    <LanguageSwitcher class="mb-4" />
    <div v-if="loading" class="text-center py-8">
      <ProgressSpinner />
    </div>
    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PortfolioItem v-for="item in portfolios" :key="item.id" :portfolio="item" />
      </div>
      <div v-if="error" class="text-red-500 mt-4">{{ error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePortfolioStore } from '@/modules/Portfolio/store/portfolio.store'
import { computed, onMounted } from 'vue'
import PortfolioItem from '@/modules/Portfolio/components/PortfolioItem.vue'
import LanguageSwitcher from '@/modules/i18n/components/LanguageSwitcher.vue'
import ProgressSpinner from 'primevue/progressspinner'

const store = usePortfolioStore()

const portfolios = computed(() => store.portfolios)

onMounted(async () => {
  // await store.fetchPortfolios()
})

const loading = computed(() => store.loading)
const error = computed(() => store.error)
</script>
