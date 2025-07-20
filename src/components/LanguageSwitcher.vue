<template>
  <select v-model="$i18n.locale" class="border rounded px-2 py-1">
    <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">
      {{ locale }}
    </option>
  </select>
</template>

<script setup lang="ts"></script>
