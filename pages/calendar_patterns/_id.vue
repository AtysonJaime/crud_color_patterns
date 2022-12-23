<template lang="pug">
  b-card.shadow(header-tag='header')
    template(#header)
      .button-back
        b-link(:href='linkRotaBack' variant='outline-dark' :title='$t("showPage.titleButtonBack")' :alt='$t("showPage.titleButtonBack")')
          font-awesome-icon.icon-margin(icon="fa-solid fa-chevron-left")
          | {{$t("showPage.textBack")}}
      .button-actions
        ModalEditar(:idColor='parseInt($route.params.id)' :bgColor='bg_color' :textColor='text_color' :showPage='true')
        ModalDelete(:idColor='parseInt($route.params.id)' :showPage='true')
    .content-infos
      b-row
        b-col.p-3(sm='4' cols="12" )
          .info-itens
            .item
              h4 Id:
              p {{id}}
            .item
              h4 Background Color:
              p {{bg_color}}
            .item
              h4 Text Color:
              p {{text_color}}
        b-col.p-3.d-flex.align-items-center(sm='8' cols="12")
          .previewerColor(:style='changeStyles')
            p Previewer Color
</template>

<script>
import { mapState } from 'vuex'
import ModalDelete from '~/components/functionality/ModalDelete.vue'
import ModalEditar from '~/components/functionality/ModalEditar.vue'
export default {
  components: {
    ModalDelete,
    ModalEditar,
  },

  data() {
    return {
      bg_color: '',
      text_color: '',
      id: '',
      error: { status: '' },
    }
  },

  async fetch() {
    this.id = parseInt(this.$route.params.id)
    await this.$axios
      .get(`/calendar_patterns/${this.id}`)
      .then((res) => {
        this.bg_color = res.data.data.bg_color
        this.text_color = res.data.data.text_color
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.response)
        this.error = err.response
      })
  },

  computed: {
    ...mapState('language', ['locate']),
    linkRotaBack() {
      return this.locate === 'pt'
        ? `/calendar_patterns`
        : `/en/calendar_patterns`
    },
    changeStyles() {
      return `background-color: ${this.bg_color}; color: ${this.text_color}`
    },
  },

  mounted() {
    if (this.error.status !== '') {
      if (this.error.status === 409) {
        this.$toasted.global.defaultError({
          msg: `Token Expired`,
        })
        this.linkRota()
      } else {
        this.linkRota('calendar_patterns')
      }
    }
  },

  methods: {
    linkRota(rota = '') {
      const pushRota = this.locate === 'pt' ? `/${rota}` : `/en/${rota}`
      this.$router.push(pushRota)
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  .card-header {
    background-color: var(--white);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    .icon-margin {
      margin-right: 0.3125rem;
    }

    .button-actions {
      display: flex;
      align-items: center;
      div ~ div {
        margin-left: 0.3125rem;
      }
    }
  }

  .content-infos {
    font-family: 'Chivo Mono' !important;
    .item {
      font-family: 'Chivo Mono' !important;
      p {
        margin: 0;
      }
      ~ .item {
        margin-top: 1.25rem;
      }
    }
    .previewerColor {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 12.5rem;
      padding: 0.3125rem;
      border-radius: 0.625rem;
    }
  }
}
</style>
