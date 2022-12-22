<template lang="pug">
  .table-content
    b-card.card-loading(v-if='isLoading')
      b-skeleton.load-table(animation="wave")
    .content-no-item(v-else-if='colors.length === 0')
      p {{$t('textFeedback')}}
    TablePage(v-else)

</template>

<script>
import { mapState } from 'vuex'
import TablePage from '~/components/structure/TablePage.vue'
export default {
  components: {
    TablePage,
  },
  data() {
    return {
      isLoading: true,
    }
  },

  computed: {
    ...mapState('auth', ['loggedIn']),
    ...mapState('language', ['locate']),
    ...mapState('color_patterns', ['colors', 'statusErro']),
  },

  async mounted() {
    try {
      await this.$store.dispatch('color_patterns/getColors')
      this.isLoading = false
      if (this.statusErro === 409) {
        this.$toasted.global.defaultError({
          msg: `Token Expired`,
        })
        this.linkRota()
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  },

  created() {
    if (!this.loggedIn) {
      this.linkRota()
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
.table-content {
  overflow: auto;
  background-color: var(--cream);

  .card-loading {
    border: none;
    background-color: var(--white);
    .load-table {
      width: 100%;
      min-height: 31.25rem;
      height: 100%;
    }
  }

  .content-no-item {
    width: 100%;
    min-height: 18.75rem;
    background-color: var(--white);
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
