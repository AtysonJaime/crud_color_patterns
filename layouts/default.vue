<template lang="pug">
  .main-content
    .body-content
      Nuxt
</template>

<script>
export default {
  name: 'DefaultLayout',

  async mounted() {
    await this.$store.dispatch('language/getLocate', this.language)
  },
}
</script>

<style lang="scss" scoped>
.main-content {
  display: flex;
  width: 100%;
  background-color: var(--cream);
}
</style>
