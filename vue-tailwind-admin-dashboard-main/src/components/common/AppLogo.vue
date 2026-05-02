<template>
  <template v-if="forceTheme === 'light'">
    <img
      :src="full ? '/images/logo/logo.svg' : '/images/logo/logo-icon.svg'"
      :alt="alt"
      :class="imgClass"
      :width="width"
      :height="height"
      loading="eager"
      decoding="async"
    />
  </template>

  <template v-else-if="forceTheme === 'dark'">
    <img
      :src="full ? '/images/logo/logo-dark.svg' : '/images/logo/logo-icon.svg'"
      :alt="alt"
      :class="imgClass"
      :width="width"
      :height="height"
      loading="eager"
      decoding="async"
    />
  </template>

  <template v-else-if="full">
    <img
      class="dark:hidden"
      src="/images/logo/logo.svg"
      :alt="alt"
      :class="imgClass"
      :width="width"
      :height="height"
      loading="eager"
      decoding="async"
    />
    <img
      class="hidden dark:block"
      src="/images/logo/logo-dark.svg"
      :alt="alt"
      :class="imgClass"
      :width="width"
      :height="height"
      loading="eager"
      decoding="async"
    />
  </template>

  <template v-else>
    <img
      src="/images/logo/logo-icon.svg"
      :alt="alt"
      :class="imgClass"
      :width="width"
      :height="height"
      loading="eager"
      decoding="async"
    />
  </template>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    full?: boolean
    alt?: string
    imgClass?: string
    width?: number | string
    height?: number | string
    forceTheme?: 'light' | 'dark' | null
  }>(),
  {
    full: true,
    alt: 'Logo',
    imgClass: '',
    width: undefined,
    height: undefined,
    forceTheme: null,
  },
)
</script>

