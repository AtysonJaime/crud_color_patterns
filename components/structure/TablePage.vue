<template lang="pug">
  b-card.shadow(header-tag='header')
    template(#header)
      ModalCadastro
      b-button-group.button-group(size='sm')
        b-button(variant="outline-secondary" @click='prev(links.prev)' :disabled='links.prev === null') {{$t('TablePage.prev')}}
        b-button(disabled) {{$t('TablePage.page') + ' ' + currentPage + ' ' + $t('TablePage.of') + ' ' + totalPages}}
        b-button(variant="outline-primary" @click='next(links.next)' :disabled='links.next === null') {{$t('TablePage.next')}}
    .table-conteiner.table-responsive.mt-4
      table.table.b-table.table-striped(:per-parge='perPage' role='table' aria-busy='false' aria-colcount='4')
        thead(role='rowgroup')
          tr(role='row')
            th.row-id(role='columnheader' scope='col' aria-colindex='1') ID
            th(role='columnheader' scope='col' aria-colindex='2') Background Color
            th(role='columnheader' scope='col' aria-colindex='3') Text Color
            th(role='columnheader' scope='col' aria-colindex='4') Actions
        tbody(role='rowgroup')
          tr(role='row' v-for="item in colors" :key="item.id")
            td.text-center(aria-colindex='1' role='cell') {{item.id}}
            td(aria-colindex='2' role='cell')
              b-link(:href='locate === "pt" ? `/calendar_patterns/${item.id}` : `/en/calendar_patterns/${item.id}`') {{item.bg_color}}
            td(aria-colindex='3' role='cell') {{item.text_color}}
            td(aria-colindex='4' role='cell')
              ModalDelete(:idColor='item.id')

</template>

<script>
import { mapState } from 'vuex'
import ModalDelete from '~/components/functionality/ModalDelete.vue'
import ModalCadastro from '~/components/functionality/ModalCadastro.vue'
export default {
  components: {
    ModalDelete,
    ModalCadastro,
  },
  data() {
    return {
      fields: ['id', 'bg_color', 'text_color', 'actions'],
    }
  },

  computed: {
    ...mapState('language', ['locate']),
    ...mapState('color_patterns', [
      'colors',
      'totalPages',
      'perPage',
      'currentPage',
      'links',
    ]),
  },

  methods: {
    next(e) {
      console.log(e)
    },

    prev(e) {
      console.log(e)
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

    .button-adicionar,
    .button-group {
      margin: 0.625rem;
    }

    @media screen and (max-width: 31.25rem) {
      flex-direction: column;
      .button-group {
        flex-direction: column;
        justify-content: center;
        button {
          border-radius: 0;
          &:last-child {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-bottom-left-radius: 0.25rem;
            border-bottom-right-radius: 0.25rem;
          }
          &:first-child {
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;
            border-top-right-radius: 0.25rem;
            border-top-left-radius: 0.25rem;
          }
        }
      }
    }
  }
}
.table-conteiner {
  border: 2px solid var(--gray);
  background-color: var(--cream);
  margin: 0;
  border-radius: 0.625rem;

  table {
    min-width: 37.5rem;
  }

  .row-id {
    width: 5rem;
    text-align: center;
  }
}
</style>
