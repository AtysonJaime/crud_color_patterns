<template lang="pug">
  .content-modal-cadastro
    b-button.button-adicionar(variant="outline-success" @click='modalShow = !modalShow')
      font-awesome-icon.icon-font(icon="fa-solid fa-plus")
      | {{$t('addModal.add')}}
    b-modal.modal-delete(centered id='modal_create' v-model='modalShow' hide-footer :title="$t('addModal.headerText')")
      .content-form
        b-form-group(
          id='bgcolor'
          label='Background color'
          label-for='bgcolor_input'
          :invalidFeedback="mensage.bg_color"
          :state='error.bg_color'
        )
          b-form-input#bgcolor_input(v-model='form.bg_color' :state='error.bg_color' v-mask='["XXXXXX"]' @blur='validateForm("bg_color")')
        b-form-group(
          id='textcolor'
          label='Text color'
          label-for='textcolor_input'
          :invalidFeedback="mensage.text_color"
          :state='error.text_color'
        )
          b-form-input#textcolor_input(v-model='form.text_color' :state='error.text_color' v-mask='["XXXXXX"]' @blur='validateForm("text_color")')
        .previewerColor(:style='changeStyles')
          p Previewer Color

      .button-actions
        b-button(class="m-2" variant="warning" @click="modalShow = !modalShow") {{$t('buttonCancel')}}
        b-button(class="m-2" variant="outline-success" @click="createColor")
          p(v-if='!isLoading') {{$t('addModal.buttonCreate')}}
          font-awesome-icon.icon-font(v-else icon="fa-solid fa-circle-notch fa-spin")

</template>

<script>
import { mask, tokens } from 'vue-the-mask'
export default {
  directives: { mask, tokens },
  data() {
    return {
      modalShow: false,
      isLoading: false,
      form: {
        bg_color: '',
        text_color: '',
      },
      error: {
        bg_color: null,
        text_color: null,
      },
      mensage: {
        bg_color: '',
        text_color: '',
      },
    }
  },
  computed: {
    changeStyles() {
      const background =
        this.form.bg_color === '' ? 'white' : `#${this.form.bg_color}`
      const text =
        this.form.text_color === '' ? 'black' : `#${this.form.text_color}`
      return `background-color: ${background}; color: ${text}`
    },
  },
  methods: {
    validateForm(input) {
      const regEx = /^([A-Fa-f0-9]{6})$/
      if (this.form[input] === '') {
        this.mensage[input] = this.$t('addModal.feedbackMensage')
        this.error[input] = false
      } else if (this.form[input].length < 6) {
        this.mensage[input] = this.$t('addModal.feedbackNumber')
        this.error[input] = false
      } else if (!regEx.test(this.form[input])) {
        this.mensage[input] = this.$t('addModal.feedbackHexColor')
        this.error[input] = false
      } else {
        this.mensage[input] = ''
        this.error[input] = null
      }
    },

    async createColor() {
      this.isLoading = true
      this.validateForm('bg_color')
      this.validateForm('text_color')
      if (this.error.bg_color !== null || this.error.bg_color !== null) {
        this.$toasted.global.defaultError({
          msg: 'Error Form',
        })
        this.isLoading = false
      } else {
        const data = {
          calendar_patterns: {
            bg_color: `#${this.form.bg_color}`,
            text_color: `#${this.form.text_color}`,
            active: 1,
          },
        }
        await this.$axios
          .post('/calendar_patterns', data)
          .then(async (res) => {
            // eslint-disable-next-line no-console
            console.log(res)
            this.$toasted.global.defaultSuccess({
              msg: 'Success create',
            })
            this.isLoading = false
            this.modalShow = false
            await this.$store.dispatch('color_patterns/getColors')
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.log(err.response)
            if (err.response.status === 409) {
              this.$toasted.global.defaultError({
                msg: `Token Expired`,
              })
              this.linkRota()
            }
          })
      }
    },

    linkRota(rota = '') {
      const pushRota = this.locate === 'pt' ? `/${rota}` : `/en/${rota}`
      this.$router.push(pushRota)
    },
  },
}
</script>

<style lang="scss" scoped>
.modal,
.modal-header {
  font-family: 'Chivo Mono' !important;
}
.icon-font {
  margin-right: 0.3125rem;
}
.previewerColor {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  padding: 0.3125rem;
  border-radius: 0.625rem;
}
.form-group,
label,
input {
  font-family: 'Chivo Mono' !important;
}
p {
  margin: 0;
  font-family: 'Chivo Mono' !important;
}
.button-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  button {
    margin: 0.3125rem;
    font-family: 'Chivo Mono' !important;
  }
}
</style>
