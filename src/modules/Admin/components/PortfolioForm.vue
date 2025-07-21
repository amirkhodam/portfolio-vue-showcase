<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { usePortfolioStore } from '@/modules/Portfolio/store/portfolio.store'
import type { IPortfolio, Media } from '@/modules/api/services/portfolio/portfolio.interface'
import Button from '@/components/button/Button.vue'

const props = defineProps<{ portfolio?: IPortfolio }>()
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

const mediaFiles = ref<File[]>([])
const uploading = ref(false)

const existingMedia = computed<Media[]>(() => form.value.media || [])

watch(
  () => props.portfolio,
  (val) => {
    refreshPortfolio(val)
  },
  { immediate: true, deep: true }
)

function refreshPortfolio(val?: IPortfolio) {
  if (val) {
    form.value = { ...val }
  } else {
    form.value = {
      id: '',
      title: { en: '', fr: '' },
      media: [],
      texts: { en: [''], fr: [''] }
    }
  }
}

function save() {
  emit(
    'save',
    props.portfolio?.id ? { ...form.value } : { texts: form.value.texts, title: form.value.title }
  )
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
    const portfolio = await portfolioStore.fetchPortfolio(form.value.id)
    mediaFiles.value = []
    // refreshPortfolio(portfolio)
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
    const portfolio = await portfolioStore.fetchPortfolio(form.value.id)
    // refreshPortfolio(portfolio)
    // Optionally show a success message here
  } catch (e) {
    // Optionally show an error message here
  }
}

// Drag-and-drop state for media reordering
const draggingIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)

function onDragStart(idx: number) {
  draggingIndex.value = idx
}
function onDragOver(idx: number) {
  dragOverIndex.value = idx
}
function onDrop() {
  if (draggingIndex.value === null || dragOverIndex.value === null) return
  const arr = [...form.value.media]
  const [moved] = arr.splice(draggingIndex.value, 1)
  arr.splice(dragOverIndex.value, 0, moved)
  // Update index field
  arr.forEach((m, i) => (m.index = i))
  form.value.media = arr
  draggingIndex.value = null
  dragOverIndex.value = null
  saveMediaOrder()
}
function onDragEnd() {
  draggingIndex.value = null
  dragOverIndex.value = null
}

async function saveMediaOrder() {
  if (!form.value.id) return
  // Call store to persist new order
  await portfolioStore.saveMediaOrder({
    id: form.value.id,
    media: form.value.media.map(({ id, index }) => ({ id, index }))
  })
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
          v-for="(media, index) in existingMedia"
          :key="media.id"
          draggable="true"
          @dragstart="onDragStart(index)"
          @dragover.prevent="onDragOver(index)"
          @drop.prevent="onDrop"
          @dragend="onDragEnd"
          :class="[
            'flex items-center justify-between rounded bg-gray-50 px-3 py-2 transition',
            draggingIndex === index ? 'opacity-50' : '',
            dragOverIndex === index && draggingIndex !== null && draggingIndex !== index
              ? 'ring-primary ring-2'
              : ''
          ]"
        >
          <span class="cursor-move truncate text-gray-800">
            <svg
              class="mr-2 inline h-4 w-4 cursor-move text-gray-400"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01M8 8h.01M12 8h.01M16 8h.01"
              />
            </svg>
            {{ media.name }}
          </span>
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
