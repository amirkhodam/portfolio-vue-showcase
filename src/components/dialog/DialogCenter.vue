<script setup lang="ts">
import Dialog from 'primevue/dialog'

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <Dialog v-bind="$props" v-on="$attrs" class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </Dialog>
</template>
