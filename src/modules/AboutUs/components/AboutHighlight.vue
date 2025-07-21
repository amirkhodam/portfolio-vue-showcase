<script setup lang="ts">
import { useTranslatedString } from '@/modules/i18n/useTranslatedString'
const props = defineProps<{ title: any; texts: any }>()
</script>
<template>
  <div class="rounded bg-white p-4 shadow">
    <h2 class="mb-2 text-xl font-bold">{{ useTranslatedString(props.title) }}</h2>
    <div class="mb-2">
      <p v-for="(text, idx) in useTranslatedString(props.texts).value" :key="'text' + idx">
        {{ text }}
      </p>
    </div>
  </div>
</template>
