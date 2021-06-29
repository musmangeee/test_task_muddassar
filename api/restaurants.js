// import axios from "axios";
// axios.delete({}, );
let customerId = "00000000-0000-0000-0000-000000000000"
export default (axios) => ({
  getAll() {
    return axios.get(`/api/customers/${customerId}/restaurants`, {})
  },

  get(restaurantId) {
    return axios.get(
      `/api/customers/${customerId}/restaurants/${restaurantId}`,
      {}
    )
  },

  update(restaurantId, payload) {
    return axios.put(
      `/api/customers/${customerId}/restaurants/${restaurantId}`,
      payload
    )
  },

  delete(restaurantId) {
    return axios.delete(
      `/api/customers/${customerId}/restaurants/${restaurantId}`
    )
  },

  create(payload) {
    return axios.post(`/api/customers/${customerId}/restaurants`, payload)
  },
})
