<template lang="pug">
  b-navbar.header.shadow(variant="faded" type="light")
    b-navbar-brand.logo_header(href="#")
      b-img(:src='image' alt='Logo Imagem' fluid)
      h1 Color Patterns
    b-navbar-nav.ml-auto
      SwitchLanguage
      b-avatar.logoff(button @click='logoff' variant='dark' :title='$t("headerPage.titleButtonLogoff")' :alt='$t("headerPage.titleButtonLogoff")')
        font-awesome-icon(icon="fa-solid fa-arrow-right-from-bracket")
</template>

<script>
import { mapState } from 'vuex'
import SwitchLanguage from '../functionality/SwitchLanguage.vue'
export default {
  components: {
    SwitchLanguage,
  },
  data() {
    return {
      image: require('~/assets/img/art.png'),
    }
  },

  computed: {
    ...mapState('language', ['locate']),
  },

  methods: {
    linkRota(rota = '') {
      const pushRota = this.locate === 'pt' ? `/${rota}` : `/en/${rota}`
      this.$router.push(pushRota)
    },

    async logoff() {
      await this.$auth.logout().then(() => {
        this.$toasted.global.defaultSuccess({
          msg:
            this.locate === 'pt'
              ? 'Usuário deslogado com sucesso'
              : 'Success user logoff',
        })
        this.linkRota()
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  min-height: 3.75rem;
  height: 100%;
  border-bottom: 1px solid var(--gray);
  background-color: var(--cream);
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  .logo_header {
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
      font-size: 1.5625rem;
      margin: 0;
      margin-left: 0.625rem;
    }
  }

  .logoff {
    margin-left: 0.625rem;
  }
}
</style>
