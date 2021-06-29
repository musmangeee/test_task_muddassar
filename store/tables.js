// https://itnext.io/quickly-building-restful-uis-in-nuxtjs-782bce539440

export const state = () => ({
  list: [],
  selectedTable: null,
  table: {},
})

export const mutations = {
  setList(state, payload) {
    state.list = payload
  },
  setTable(state, payload) {
    state.table = payload
  },
  setSelectedTable(state, payload) {
    state.selectedTable = payload
  },
}

export const actions = {
  async getAll({ commit }, restaurantId) {
    return await this.$api.tables
      .getAll(restaurantId)
      .then((res) => {
        if (res.status === 200) {
          commit("setList", res.data)
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Loading Tables...")
        return res
      })
  },
  
  async create({ dispatch }, { restaurantId, payload }) {
    return await this.$api.tables
      .create(restaurantId, payload)
      .then((res) => {
        if (res.status === 201) {
          dispatch("getAll", restaurantId)
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Creating Table...")
        return res
      })
  },
  async update({ dispatch }, { restaurantId, tableId, payload }) {
    return await this.$api.tables
      .update(restaurantId, tableId, payload)
      .then((res) => {
        if (res.status === 200) {
          dispatch("getAll", restaurantId)
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Updating Table...")
        return res
      })
  },

  async delete({ dispatch }, { restaurantId, tableId }) {
    return await this.$api.tables
      .delete(restaurantId, tableId)
      .then((res) => {
        if (res.status === 204) {
          dispatch("getAll", restaurantId)
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Deleting Table...")
        return res
      })
  },

  async setWaiter({ dispatch }, { restaurantId, waiterId, payload }) {
    return await this.$api.tables
      .setWaiter(restaurantId, waiterId, payload)
      .then((res) => {
        if (res.status === 200) {
          dispatch("getAll", restaurantId)
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Updating Table...")
        return res
      })
  },

}
