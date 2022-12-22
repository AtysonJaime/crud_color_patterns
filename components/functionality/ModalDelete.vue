<template lang="pug">
  .content-modal-delete
    b-avatar.button-delete(button @click="modalShow = !modalShow" variant='outline-danger' :title='$t("deleteModal.titleButtonDelete")' :alt='$t("deleteModal.titleButtonDelete")' :v-b-modal='"modal_delete_" + idColor')
      font-awesome-icon(icon="fa-solid fa-trash")
    b-modal.modal-delete(centered :id='"modal_delete_" + idColor' v-model='modalShow' hide-footer :title="$t('deleteModal.headerText')")
      .d-block.text-center.font-change
        h4 {{$t('deleteModal.bodyText') + ' ' + idColor}} ?
      .button-actions
        b-button(class="m-2" variant="warning" @click="modalShow = !modalShow") {{$t('buttonCancel')}}
        b-button(class="m-2" variant="outline-danger" @click="deleteColor") {{$t('deleteModal.buttonDelete')}}
</template>

<script>
export default {
  props: {
    idColor: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      modalShow: false,
    }
  },

  methods: {
    deleteColor() {
      this.$axios
        .delete(`/calendar_patterns/${this.idColor}`)
        .then(async (res) => {
          // eslint-disable-next-line no-console
          console.log(res)
          this.$toasted.global.defaultSuccess({
            msg: 'Success delete',
          })
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
    },
    linkRota(rota = '') {
      const pushRota = this.locate === 'pt' ? `/${rota}` : `/en/${rota}`
      this.$router.push(pushRota)
    },
  },
}
</script>

<style lang="scss" scoped>
.content-modal-delete {
  .button-delete {
  }
}
.modal {
  font-family: 'Chivo Mono' !important;
}
.font-change {
  font-family: 'Chivo Mono' !important;
}
.button-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  button {
    margin: 0.3125rem;
  }
}
</style>
