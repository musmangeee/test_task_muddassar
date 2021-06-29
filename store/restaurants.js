// https://itnext.io/quickly-building-restful-uis-in-nuxtjs-782bce539440

export const state = () => ({
  list: [],
  selectedRestaurant: null,
  restaurant: {},
  restaurantDetails: {
    navDrawer: false,
    name: "Hustle",
    tagLine: "Best Restaurant",
    phoneNumber: "+44 (20) 38655467",
    address: "3-5 Campden Hill Road, W8 7DU, London",
    socials: [
      {
        icon: "mdi-facebook",
        name: "facebook",
        link: "#",
      },
      {
        icon: "mdi-twitter",
        name: "twitter",
        link: "#",
      },
      {
        icon: "mdi-instagram",
        name: "instagram",
        link: "#",
      },
      {
        icon: "mdi-linkedin",
        name: "linkedin",
        link: "#",
      },
    ],
    navLinks: [
      {
        to: "/restaurants_layout/1/",
        name: "home",
        title: "Home",
        icon: "mdi-image",
        class: "",
      },
      {
        to: "/restaurants_layout/1/#about",
        name: "about-us",
        title: "About Us",
        icon: "mdi-image",
        class: "",
      },
      {
        to: "/restaurants_layout/1/#contact",
        name: "contact",
        title: "Contact",
        icon: "mdi-image",
        class: "",
      },
      {
        to: "/restaurants_layout/1/booking/",
        name: "booking",
        title: "Booking",
        icon: "mdi-image",
        class: "",
      },
      {
        to: "/restaurants_layout/1/menu/",
        name: "order-online",
        title: "Order Online",
        icon: "mdi-image",
        class: "special-nav",
      },
    ],
  },
})

export const mutations = {
  setList(state, payload) {
    state.list = payload
  },
  setRestaurant(state, payload) {
    state.restaurant = payload
  },
  setSelectedRestaurant(state, payload) {
    state.selectedRestaurant = payload
  },
  setRestaurantNavDrawer(state, payload) {
    state.restaurant.navDrawer = payload
  },
}

export const actions = {
  async getAll({ commit }) {
    return await this.$api.restaurants
      .getAll()
      .then((res) => {
        if (res.status === 200) {
          commit("setList", res.data)
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Loading Restaurants...")
        return res
      })
  },
  async get({ commit, state }, { restaurantId }) {
    return await this.$api.restaurants
      .get(restaurantId)
      .then((res) => {
        if (res.status === 200) {
          let mappedSocials = []
          let socials = Object.entries(JSON.parse(res.data.socials)).forEach(
            (social) => {
              let mappedSocial = state.restaurantDetails.socials.find(
                (soc) => social[0] && social[0].includes(soc.name)
              )
              mappedSocial
              if (mappedSocial && ![null, "", " "].includes(social[1])) {
                mappedSocial["link"] = social[1]
                mappedSocials.push(mappedSocial)
              }
            }
          )
          let restaurant = {
            ...state.restaurantDetails,
            ...res.data,
            socials: mappedSocials,
          }
          commit("setRestaurant", restaurant)
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Loading Restaurant details...")
        return res
      })
  },
  async create({ dispatch }, { payload }) {
    return await this.$api.restaurants
      .create(payload)
      .then((res) => {
        if (res.status === 201) {
          dispatch("getAll")
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Creating Restaurant...")
        return res
      })
  },
  async update({ dispatch }, { restaurantId, payload }) {
    return await this.$api.restaurants
      .update(restaurantId, payload)
      .then((res) => {
        if (res.status === 200) {
          dispatch("getAll")
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Updating Restaurant...")
        return res
      })
  },
  async delete({ dispatch }, { restaurantId }) {
    return await this.$api.restaurants
      .delete(restaurantId)
      .then((res) => {
        if (res.status === 204) {
          dispatch("getAll")
        }
        return res
      })
      .catch((res) => {
        this.$toast.error("Error While Deleting Restaurant...")
        return res
      })
  },
}
