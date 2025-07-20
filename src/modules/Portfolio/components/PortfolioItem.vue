<script setup lang="ts">
import { computed, ref } from 'vue'
import GalleryShow from '../../../components/Gallery/GalleryShow.vue'
import type { IPortfolio } from '@/modules/api'
import { useTranslatedString } from '@/modules/i18n/useTranslatedString'

const props = defineProps<{
  portfolio: IPortfolio
}>()

const showGallery = ref(false)

const texts = computed(() => {
  return useTranslatedString(props.portfolio.texts).value
})

function openGallery() {
  showGallery.value = true
}
</script>

<template>
  <div class="rounded bg-white p-4 shadow">
    <h2 class="mb-2 text-xl font-bold">{{ useTranslatedString(portfolio.title) }}</h2>
    <div class="mb-2">
      <img
        v-if="portfolio.images && portfolio.images.length"
        :src="portfolio.images[0]"
        class="h-48 w-full cursor-pointer rounded object-cover"
        @click="openGallery"
        alt="Portfolio image"
      />
    </div>
    <div class="mb-2">
      <p v-for="text in texts" :key="'text' + Math.floor(Math.random() * 1000)">
        {{ text }}
      </p>
    </div>
    <button
      v-if="portfolio.videos && portfolio.videos.length"
      class="bg-primary mt-2 rounded px-4 py-2 text-white"
      @click="openGallery"
    >
      {{ $t('portfolio.gallery') }}
    </button>
    <gallery-show
      v-model="showGallery"
      :images="portfolio.images"
      :videos="portfolio.videos"
      @close="showGallery = false"
    />
  </div>
</template>
