// https://itnext.io/quickly-building-restful-uis-in-nuxtjs-782bce539440

export const state = () => ({
  list: [],
  sectionsList: [],
  itemsList: [],
  extrasList: [],
  selectedMenu: null,
  selectedMenuSection: null,
  selectedMenuItem: null,
  selectedMenuExtra: null,
  menus: [],
  menu: {},
})

export const mutations = {
  setList(state, payload) {
    state.list = payload
  },
  setMenus(state, payload) {
    state.menus = payload
  },
  setSectionsList(state, payload) {
    state.sectionsList = payload
  },
  setItemsList(state, payload) {
    state.itemsList = payload
  },
  setExtrasList(state, payload) {
    state.extrasList = payload
  },
  setSelectedMenu(state, payload) {
    state.selectedMenu = payload
  },
  setSelectedMenuSection(state, payload) {
    state.selectedMenuSection = payload
  },
  setSelectedMenuItem(state, payload) {
    state.selectedMenuItem = payload
  },
  setSelectedMenuExtra(state, payload) {
    state.selectedMenuExtra = payload
  },
}

export const actions = {
  async getMenus({ commit, state }, { restaurantId }) {
    return await this.$api.menus
      .getAll(restaurantId)
      .then((res) => {
        if (res.status === 200) {
          commit("setMenus", res.data)
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Loading Menus...")
        return res
      })
  },

  //menus
  async getAll({ commit }, { restaurantId }) {
    return await this.$api.menus
      .getAll(restaurantId)
      .then((res) => {
        if (res.status === 200) {
          commit("setList", [])
          commit("setList", res.data)
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Loading Menus...")
        return res
      })
  },
  async get({ commit }, { restaurantId, menuId }) {
    return await this.$api.menus
      .get(restaurantId, menuId)
      .then((res) => {
        if (res.status === 200) {
          commit("setList", res.data)
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Loading Menu Details...")
        return res
      })
  },
  async update({ dispatch }, { restaurantId, menuId, payload }) {
    return await this.$api.menus
      .update(restaurantId, menuId, payload)
      .then((res) => {
        if (res.status === 200) {
          dispatch("getAll", {
            restaurantId,
          })
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Updating Menu...")
        return res
      })
  },
  async delete({ dispatch }, { restaurantId, menuId }) {
    return await this.$api.menus
      .delete(restaurantId, menuId)
      .then((res) => {
        if (res.status === 204) {
          dispatch("getAll", {
            restaurantId,
          })
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Deleting Menu...")
        return res
      })
  },
  async create({ dispatch }, { restaurantId, payload }) {
    return await this.$api.menus
      .create(restaurantId, payload)
      .then((res) => {
        if (res.status === 201) {
          dispatch("getAll", {
            restaurantId,
          })
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Creating Menu...")
        return res
      })
  },

  //sections
  async getAllSections({ commit }, { restaurantId, menuId }) {
    return await this.$api.menus
      .getAllSections(restaurantId, menuId)
      .then((res) => {
        if (res.status === 200) {
          commit("setSectionsList", [])
          commit("setSectionsList", res.data)
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Loading Menus Sections...")
        return res
      })
  },
  async updateSection(
    { dispatch },
    { restaurantId, menuId, sectionId, payload }
  ) {
    return await this.$api.menus
      .updateSection(restaurantId, menuId, sectionId, payload)
      .then((res) => {
        if (res.status === 200) {
          dispatch("getAllSections", {
            restaurantId,
            menuId,
          })
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Updating Menu Section...")
        return res
      })
  },
  async deleteSection({ dispatch }, { restaurantId, menuId, sectionId }) {
    return await this.$api.menus
      .deleteSection(restaurantId, menuId, sectionId)
      .then((res) => {
        if (res.status === 204) {
          dispatch("getAllSections", {
            restaurantId,
            menuId,
          })
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Deleting Menu Section...")
        return res
      })
  },
  async createSection({ dispatch }, { restaurantId, menuId, payload }) {
    return await this.$api.menus
      .createSection(restaurantId, menuId, payload)
      .then((res) => {
        if (res.status === 200) {
          dispatch("getAllSections", {
            restaurantId,
            menuId,
          })
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Creating Menu Section...")
        return res
      })
  },

  //items
  async getAllItems({ commit }, { restaurantId, menuId }) {
    return await this.$api.menus
      .getAllItems(restaurantId, menuId)
      .then((res) => {
        if (res.status === 200) {
          commit("setItemsList", [])
          commit("setItemsList", res.data)
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Loading Menus Items...")
        return res
      })
  },
  async updateItem({ dispatch }, { restaurantId, menuId, itemId, payload }) {
    return await this.$api.menus
      .updateItem(restaurantId, menuId, itemId, payload)
      .then((res) => {
        if (res.status === 200) {
          dispatch("getAllItems", {
            restaurantId,
            menuId,
          })
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Updating Menu Item...")
        return res
      })
  },
  async deleteItem({ dispatch }, { restaurantId, menuId, itemId }) {
    return await this.$api.menus
      .deleteItem(restaurantId, menuId, itemId)
      .then((res) => {
        if (res.status === 204) {
          dispatch("getAllItems", {
            restaurantId,
            menuId,
          })
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Deleting Menu Item...")
        return res
      })
  },
  async createItem({ dispatch }, { restaurantId, menuId, payload }) {
    return await this.$api.menus
      .createItem(restaurantId, menuId, payload)
      .then((res) => {
        if (res.status === 200) {
          dispatch("getAllItems", {
            restaurantId,
            menuId,
          })
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Creating Menu Item...")
        return res
      })
  },

  //extras
  async getAllExtras({ commit }, { restaurantId, menuId }) {
    return await this.$api.menus
      .getAllExtras(restaurantId, menuId)
      .then((res) => {
        if (res.status === 200) {
          commit("setExtrasList", [])
          commit("setExtrasList", res.data)
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Loading Menus Extras...")
        return res
      })
  },
  async updateExtra({ dispatch }, { restaurantId, menuId, extraId, payload }) {
    return await this.$api.menus
      .updateExtra(restaurantId, menuId, extraId, payload)
      .then((res) => {
        if (res.status === 200) {
          dispatch("getAllExtras", {
            restaurantId,
            menuId,
          })
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Updating Menu Extra...")
        return res
      })
  },
  async deleteExtra({ dispatch }, { restaurantId, menuId, extraId }) {
    return await this.$api.menus
      .deleteExtra(restaurantId, menuId, extraId)
      .then((res) => {
        if (res.status === 204) {
          dispatch("getAllExtras", {
            restaurantId,
            menuId,
          })
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Deleting Menu Extra...")
        return res
      })
  },
  async createExtra({ dispatch }, { restaurantId, menuId, payload }) {
    return await this.$api.menus
      .createExtra(restaurantId, menuId, payload)
      .then((res) => {
        if (res.status === 200) {
          dispatch("getAllExtras", {
            restaurantId,
            menuId,
          })
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Creating Menu Extra...")
        return res
      })
  },
}
