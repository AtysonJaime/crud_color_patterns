<template lang="pug">
  .container.form-content
    .form-content_header
      .logo_header
        b-img(:src='image' alt='Logo Imagem' fluid)
        h1 Color Patterns
      SwitchLanguage
    p {{$t('loginPage.loginEntrada')}}
    .form-content_body
      b-form.form
        b-form-group(id='email-login-group' label='E-Mail' label-for='email-login')
            b-form-input(id='email-login' v-model='login.email' required)
        b-form-group(id='password-login-group' :label="$t('loginPage.labelPassword')" label-for='password-login')
          b-input-group
            b-form-input(id='password-login' v-model='login.password' required :type='typePassword')
            b-input-group-append
              b-button(variant="outline-secondary" @click='changeTypePassword' :title='$t("loginPage.titleShowPassword")' :alt='$t("loginPage.titleShowPassword")')
                font-awesome-icon(v-if='typePassword === "password"' icon="fa-solid fa-eye")
                font-awesome-icon(v-else icon="fa-solid fa-eye-slash")
      .button-actions
        b-link(:href="'https://github.com/AtysonJaime/crud_color_patterns/blob/main/' + $t('loginPage.readme')" exact target="_blank" rel="noopener") {{$t('loginPage.introducaoLogin')}}
        b-button.button(type='button' block variant="outline-success" :disabled='disabledLogin' @click='loginUser') Login

</template>

<script>
import { mapState } from 'vuex'
import SwitchLanguage from '~/components/functionality/SwitchLanguage.vue'

export default {
  name: 'IndexPage',

  components: {
    SwitchLanguage,
  },

  layout: 'loginPage',

  data() {
    return {
      login: {
        email: '',
        password: '',
      },
      typePassword: 'password',
      image: require('~/assets/img/art.png'),
    }
  },

  computed: {
    disabledLogin() {
      return this.login.email === '' && this.login.password === ''
    },
    ...mapState('language', ['locate']),
  },

  methods: {
    changeTypePassword() {
      this.typePassword = this.typePassword === 'password' ? 'text' : 'password'
    },
    async loginUser() {
      const login = {
        email: this.login.email,
        password: this.login.password,
      }
      await this.$auth
        .loginWith('local', { data: { login } })
        .then(async (res) => {
          // eslint-disable-next-line no-console
          console.log(res)
          await this.$auth.setUserToken(res.data.data.result.access_token)
          this.$toasted.global.defaultSuccess({
            msg: 'Usuário logado com sucesso',
          })

          const pushRota =
            this.locate === 'pt'
              ? '/calendar_patterns'
              : '/en/calendar_patterns'
          this.$router.push(pushRota)
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
          this.$toasted.global.defaultError({
            msg: `Login ou Senha incorretas`,
          })
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.form-content {
  background-color: var(--white);
  max-width: 28.125rem;
  width: 100%;
  padding: 0.9375rem;
  border-radius: 1.5rem;

  .form-content_header {
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
  }
  p {
    margin: 1rem 0;
  }
  .form-content_body {
    .button-actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    a {
      margin: 1rem 0;
    }

    button {
      &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
    }
  }
}
</style>
