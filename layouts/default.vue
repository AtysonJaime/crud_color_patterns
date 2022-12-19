<template lang="pug">
  .main-content
    .header-content
      HeaderPages
    .body-content
      Nuxt
</template>

<script>
import HeaderPages from '../components/structure/HeaderPages.vue'
export default {
  name: 'DefaultLayout',

  components: {
    HeaderPages,
  },

  async mounted() {
    await this.$store.dispatch('language/getLocate', this.language)
  },
}
</script>

<style lang="scss" scoped>
.main-content {
  font-family: 'Chivo Mono' !important;
  display: flex;
  width: 100%;
  background-color: var(--cream);
}
</style>
