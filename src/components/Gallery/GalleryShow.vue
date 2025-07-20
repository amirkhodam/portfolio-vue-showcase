<script setup lang="ts">
import { computed, ref } from 'vue'
import DialogCenter from '@/components/dialog/DialogCenter.vue'

const props = defineProps<{
  modelValue: boolean
  images: Array<string>
  videos: Array<string>
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean)
}>()

const visible = computed({
  get() {
    return props.modelValue
  },
  set(value: boolean) {
    emit('update:modelValue', value)
  },
})

// Lightbox state
const lightboxVisible = ref(false)
const lightboxType = ref<'image' | 'video' | null>(null)
const lightboxSrc = ref<string>('')

function openLightbox(type: 'image' | 'video', src: string) {
  lightboxType.value = type
  lightboxSrc.value = src
  lightboxVisible.value = true
}
function closeLightbox() {
  lightboxVisible.value = false
  lightboxType.value = null
  lightboxSrc.value = ''
}
</script>

<template>
  <dialog-center
    v-model:visible="visible"
    modal
    :closable="true"
    class="fixed top-0 left-0 h-screen w-screen bg-white/30 backdrop-blur-md"
  >
    <div class="relative z-50 mx-auto w-full max-w-5xl">
      <div class="flex flex-wrap justify-center gap-6 py-16 px-8">
        <template v-for="(img, idx) in images" :key="'img-' + idx">
          <div
            class="relative z-0 cursor-pointer overflow-hidden rounded-xl shadow transition-transform duration-200 hover:scale-105 hover:shadow-2xl"
            @click="openLightbox('image', img)"
          >
            <img
              :src="img"
              class="transition-filter h-56 w-56 rounded-xl object-cover duration-200 hover:brightness-110 hover:saturate-125"
              alt="Gallery image"
            />
          </div>
        </template>
        <template v-for="(vid, idx) in videos" :key="'vid-' + idx">
          <div
            class="relative z-0 cursor-pointer overflow-hidden rounded-xl shadow transition-transform duration-200 hover:scale-105 hover:shadow-2xl"
            @click="openLightbox('video', vid)"
          >
            <video :src="vid" class="h-56 w-56 rounded-xl object-cover" muted playsinline />
            <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span class="text-4xl text-white drop-shadow-lg">▶</span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </dialog-center>

  <!-- Lightbox Modal -->
  <dialog-center
    v-model:visible="lightboxVisible"
    modal
    :closable="true"
    class="flex max-h-fit max-w-fit items-center justify-center rounded-2xl bg-black/90"
    @hide="closeLightbox"
  >
    <div class="flex max-h-fit max-w-fit items-center justify-center">
      <img
        v-if="lightboxType === 'image'"
        :src="lightboxSrc"
        class="max-h-[80vh] max-w-[80vw] rounded-xl shadow-2xl"
        alt="Preview"
      />
      <video
        v-else-if="lightboxType === 'video'"
        :src="lightboxSrc"
        controls
        autoplay
        class="max-h-[80vh] max-w-[80vw] rounded-xl shadow-2xl"
      />
    </div>
  </dialog-center>
</template>
