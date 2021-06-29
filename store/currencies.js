// https://itnext.io/quickly-building-restful-uis-in-nuxtjs-782bce539440

export const state = () => ({
  list: [],
})

export const mutations = {
  setList(state, payload) {
    state.list = payload
  },
}

export const actions = {
  async getAll({ commit }) {
    return await this.$api.currencies
      .getAll()
      .then((res) => {
        console.log(res.data)
        if (res.status === 200) {
          commit("setList", [])
          commit("setList", res.data)
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Loading Currencies...")
        return res
      })
  },
}
