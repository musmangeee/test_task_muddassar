export const state = () => ({
  barColor: "rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)",
  barImage:
    "https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg",
  drawer: null,
})

export const mutations = {
  SET_DRAWER(state, payload) {
    state.drawer = payload
  },
}

export const actions = {
  async nuxtServerInit({ dispatch }) {
    if (
      this.$router.currentRoute.name == "index" ||
      this.$router.currentRoute.name.includes("restaurants_layout-1")
    ) {
      let data = { restaurantId: "a80865d0-d0d5-41d9-b9cc-699fa8acf3ae" }
      let restaurant = await dispatch("restaurants/get", data)
      let menus = await dispatch("menus/getMenus", data)
      return [restaurant, menus]
    }
  },
}
