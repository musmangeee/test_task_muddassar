// import axios from "axios";
// axios.delete({}, );

export default (axios) => ({
  //menus
  getAll(restaurantId) {
    return axios.get(`/api/restaurants/${restaurantId}/menu`, {})
  },

  get(restaurantId, menuId) {
    return axios.get(`/api/restaurants/${restaurantId}/menu/${menuId}`, {})
  },

  update(restaurantId, menuId, payload) {
    return axios.put(`/api/restaurants/${restaurantId}/menu/${menuId}`, payload)
  },

  delete(restaurantId, menuId) {
    return axios.delete(`/api/restaurants/${restaurantId}/menu/${menuId}`)
  },

  create(restaurantId, payload) {
    return axios.post(`/api/restaurants/${restaurantId}/menu`, payload)
  },

  //sections
  getAllSections(restaurantId, menuId) {
    return axios.get(
      `/api/restaurants/${restaurantId}/menu/${menuId}/sections`,
      {}
    )
  },

  updateSection(restaurantId, menuId, sectionId, payload) {
    return axios.put(
      `/api/restaurants/${restaurantId}/menu/${menuId}/sections/${sectionId}`,
      payload
    )
  },

  deleteSection(restaurantId, menuId, sectionId) {
    return axios.delete(
      `/api/restaurants/${restaurantId}/menu/${menuId}/sections/${sectionId}`
    )
  },

  createSection(restaurantId, menuId, payload) {
    return axios.post(
      `/api/restaurants/${restaurantId}/menu/${menuId}/sections`,
      payload
    )
  },

  //items
  getAllItems(restaurantId, menuId) {
    return axios.get(
      `/api/restaurants/${restaurantId}/menu/${menuId}/items`,
      {}
    )
  },

  updateItem(restaurantId, menuId, itemId, payload) {
    return axios.put(
      `/api/restaurants/${restaurantId}/menu/${menuId}/items/${itemId}`,
      payload
    )
  },

  deleteItem(restaurantId, menuId, itemId) {
    return axios.delete(
      `/api/restaurants/${restaurantId}/menu/${menuId}/items/${itemId}`
    )
  },

  createItem(restaurantId, menuId, payload) {
    return axios.post(
      `/api/restaurants/${restaurantId}/menu/${menuId}/items`,
      payload
    )
  },

  //extras
  getAllExtras(restaurantId, menuId) {
    return axios.get(
      `/api/restaurants/${restaurantId}/menu/${menuId}/extras`,
      {}
    )
  },

  updateExtra(restaurantId, menuId, extraId, payload) {
    return axios.put(
      `/api/restaurants/${restaurantId}/menu/${menuId}/extras/${extraId}`,
      payload
    )
  },

  deleteExtra(restaurantId, menuId, extraId) {
    return axios.delete(
      `/api/restaurants/${restaurantId}/menu/${menuId}/extras/${extraId}`
    )
  },

  createExtra(restaurantId, menuId, payload) {
    return axios.post(
      `/api/restaurants/${restaurantId}/menu/${menuId}/extras`,
      payload
    )
  },
})
