<template lang="pug">
  b-table.table(:items='colors' :fields='fields' :currentPage='currentPage' :per-parge='perPage' striped responsive)
    template(#cell(actions)="row")
      b-button(size="sm" @click="alert(row.item, row.index, $event.target)" class="mr-1") Info modal
</template>

<script>
import { mapState } from 'vuex'
export default {
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
    ]),
  },
}
</script>

<style lang="scss" scoped>
.table {
  border: 2px solid var(--gray);
  background-color: var(--cream);
  margin: 0;
  border-radius: 0.625rem;
}
</style>
