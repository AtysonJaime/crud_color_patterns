export const state = () => ({
  colors: [],
  totalPages: 0,
  perPage: 0,
  currentPage: 1,
  links: {},
  statusErro: 0,
})

export const mutations = {
  SET_COLORS(state, payload) {
    state.colors = payload
  },
  SET_TOTALPAGES(state, payload) {
    state.totalPages = payload
  },
  SET_PERPAGES(state, payload) {
    state.perPage = payload
  },
  SET_CURRENTPAGE(state, payload) {
    state.currentPage = payload
  },
  SET_LINKS(state, payload) {
    state.links = payload
  },
  SET_ERROR(state, payload) {
    state.statusErro = payload
  },
}

export const actions = {
  async getColors({ commit }) {
    await this.$axios
      .get('/calendar_patterns', {
        headers: {
          Authorization: localStorage.getItem('auth._token.local'),
        },
      })
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log(res)
        const data = res.data.data
        const colors = data.entities
        const total = data.pagination.total_pages
        const links = data.pagination.links
        const currentPage = data.pagination.current_page
        const porPages = data.pagination.per_page
        commit('SET_COLORS', colors)
        commit('SET_TOTALPAGES', total)
        commit('SET_PERPAGES', porPages)
        commit('SET_CURRENTPAGE', currentPage)
        commit('SET_LINKS', links)
        commit('SET_ERROR', 0)
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.response)
        commit('SET_COLORS', [])
        commit('SET_TOTALPAGES', 1)
        commit('SET_PERPAGES', 10)
        commit('SET_CURRENTPAGE', 1)
        commit('SET_LINKS', { next: null, prev: null })
        commit('SET_ERROR', err.response.status)
      })
  },
}
