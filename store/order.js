// https://itnext.io/quickly-building-restful-uis-in-nuxtjs-782bce539440

export const state = () => ({
    list: [],
    selectedOrder: null,
    order: {},
  })
  
  export const mutations = {
    setList(state, payload) {
      state.list = payload
    },
    setTable(state, payload) {
      state.order = payload
    },
    setSelectedTable(state, payload) {
      state.selectedOrder = payload
    },
  }
  
  export const actions = {
    async getAll({ commit }, restaurantId) {
      return await this.$api.orders
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
    
 
  
  
  }
  