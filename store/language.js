export const state = () => ({
  locate: '',
})

export const mutations = {
  SET_LOCATE(state, payload) {
    state.locate = `${payload}`
    localStorage.setItem('language', state.locate)
  },

  GET_LOCATE(state) {
    state.locate =
      localStorage.getItem('language') !== null
        ? localStorage.getItem('language')
        : 'pt'
  },
}

export const actions = {
  setLocate({ commit }, data) {
    commit('SET_LOCATE', data)
  },

  getLocate({ commit }) {
    commit('GET_LOCATE')
  },
}
