<template lang="pug">
    b-avatar(button @click='SwitchLanguage' variant="dark" class="align-center" :title="$t('titleButtonSwitch')" :alt="$t('titleButtonSwitch')")
      font-awesome-icon(icon="fa-solid fa-language")
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      languageSave: '',
    }
  },

  computed: {
    ...mapState('language', ['locate']),
  },

  mounted() {
    this.languageSave = this.locate
  },

  methods: {
    async SwitchLanguage() {
      this.locate === 'pt'
        ? this.$i18n.setLocale('en')
        : this.$i18n.setLocale('pt')
      this.languageSave = this.languageSave === 'pt' ? 'en' : 'pt'
      await this.$store.dispatch('language/setLocate', this.languageSave)
    },
  },
}
</script>

<style lang="scss" scoped></style>
