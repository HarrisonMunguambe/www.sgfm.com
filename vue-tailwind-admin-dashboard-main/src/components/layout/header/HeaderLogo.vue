<template>
  <router-link to="/" class="lg:hidden">
    <AppLogo full imgClass="h-8 w-auto" :width="150" :height="40" />
  </router-link>
</template>

<script setup>
import AppLogo from '@/components/common/AppLogo.vue'
</script>
