<script setup lang="ts">
import Button from 'primevue/button'
</script>

<template>
  <Button v-bind="$props" v-on="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </Button>
</template>
