<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { usePortfolioStore } from '@/modules/Portfolio/store/portfolio.store'
import { useServices } from '@/modules/api'
import type { Media } from '@/modules/api/services/portfolio/portfolio.interface'
import Button from '@/components/button/Button.vue'

const props = defineProps<{ portfolio?: any }>()
const emit = defineEmits(['save', 'close'])

const form = ref<{
  id: string
  title: { en: string; fr: string }
  media: Media[]
  texts: { en: string[]; fr: string[] }
}>({
  id: '',
  title: { en: '', fr: '' },
  media: [],
  texts: { en: [''], fr: [''] }
})

const portfolioStore = usePortfolioStore()
const portfolioService = useServices().portfolio

const mediaFiles = ref<File[]>([])
const uploading = ref(false)

const existingMedia = computed<Media[]>(() => form.value.media || [])

watch(
  () => props.portfolio,
  (val) => {
    if (val) form.value = { ...val }
    else
      form.value = {
        id: '',
        title: { en: '', fr: '' },
        media: [],
        texts: { en: [''], fr: [''] }
      }
  },
  { immediate: true }
)

function save() {
  emit('save', { ...form.value })
}
function close() {
  emit('close')
}

function onMediaChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (files) {
    mediaFiles.value = Array.from(files)
  }
}

async function uploadMedia() {
  if (!form.value.id || mediaFiles.value.length === 0) return
  uploading.value = true
  const formData = new FormData()
  mediaFiles.value.forEach((file) => formData.append('media', file))
  try {
    await portfolioStore.uploadMedia({ id: form.value.id, form: formData })
    await portfolioStore.fetchPortfolio(form.value.id)
    mediaFiles.value = []
    // Optionally show a success message here
  } catch (e) {
    // Optionally show an error message here
  } finally {
    uploading.value = false
  }
}

async function removeMediaItem(mediaId: string) {
  if (!form.value.id) return
  try {
    await portfolioStore.removeSingleMedia({ id: form.value.id, mediaId })
    await portfolioStore.fetchPortfolio(form.value.id)
    // Optionally show a success message here
  } catch (e) {
    // Optionally show an error message here
  }
}
</script>
<template>
  <div class="p-4">
    <h3 class="mb-2 text-lg font-bold">
      {{ form.id ? $t('admin.edit_portfolio') : $t('admin.add_portfolio') }}
    </h3>
    <div v-for="locale in $i18n.availableLocales" :key="`title-${locale}`" class="mb-4">
      <label :for="`title-${locale}`" class="mb-1 block font-medium text-gray-700">
        {{ $t('admin.title_ln', { lang: locale.toUpperCase() }) }}
      </label>
      <input
        :id="`title-${locale}`"
        v-model="form.title[locale]"
        class="focus:ring-primary w-full rounded border border-gray-300 px-3 py-2 transition focus:border-transparent focus:ring-2 focus:outline-none"
      />
    </div>
    <div v-for="locale in $i18n.availableLocales" :key="`texts-${locale}`" class="mb-4">
      <label :for="`texts-${locale}`" class="mb-1 block font-medium text-gray-700">
        {{ $t('admin.texts_ln', { lang: locale.toUpperCase() }) }}
      </label>
      <textarea
        :id="`texts-${locale}`"
        v-model="form.texts[locale][0]"
        rows="3"
        class="focus:ring-primary w-full resize-none rounded border border-gray-300 px-3 py-2 transition focus:border-transparent focus:ring-2 focus:outline-none"
      />
    </div>
    <div class="mb-6">
      <label for="media-upload" class="mb-1 block font-medium text-gray-700">{{
        $t('admin.media_label')
      }}</label>
      <input
        id="media-upload"
        type="file"
        multiple
        @change="onMediaChange"
        accept="image/*,video/*"
        class="focus:ring-primary w-full rounded border border-gray-300 px-3 py-2 transition focus:border-transparent focus:ring-2 focus:outline-none"
      />
      <Button
        class="bg-primary hover:bg-primary-dark mt-3 rounded px-6 py-2 font-semibold text-white shadow transition disabled:opacity-50"
        :disabled="!mediaFiles.length || uploading"
        @click="uploadMedia"
      >
        <span v-if="uploading">{{ $t('admin.uploading') }}</span>
        <span v-else>{{ $t('admin.upload_media') }}</span>
      </Button>
      <div v-if="mediaFiles.length" class="mt-2 text-sm text-gray-600">
        <div v-for="file in mediaFiles" :key="file.name">{{ file.name }}</div>
      </div>
    </div>
    <div v-if="existingMedia.length" class="mb-6">
      <div class="mb-2 font-semibold text-gray-700">{{ $t('admin.existing_media') }}</div>
      <ul class="space-y-2">
        <li
          v-for="media in existingMedia"
          :key="media.id"
          class="flex items-center justify-between rounded bg-gray-50 px-3 py-2"
        >
          <span class="truncate text-gray-800">{{ media.name }}</span>
          <Button
            @click="removeMediaItem(media.id)"
            class="px-2 py-1 text-sm font-medium text-red-600 hover:underline"
          >
            {{ $t('admin.remove') }}
          </Button>
        </li>
      </ul>
    </div>
    <div class="mt-8 flex justify-end gap-3">
      <Button
        @click="save"
        class="bg-primary hover:bg-primary-dark rounded px-6 py-2 font-semibold text-white shadow transition"
      >
        {{ $t('admin.save') }}
      </Button>
      <Button
        @click="close"
        class="rounded bg-gray-200 px-6 py-2 font-semibold text-gray-700 transition hover:bg-gray-300"
      >
        {{ $t('admin.cancel') }}
      </Button>
    </div>
  </div>
</template>
