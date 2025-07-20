<script setup lang="ts">
import Dialog from 'primevue/dialog'

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <Dialog v-bind="$props" v-on="$attrs" class="flex h-screen w-screen items-center justify-center">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </Dialog>
</template>
