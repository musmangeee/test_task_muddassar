// import axios from "axios";
// axios.delete({}, );

export default axios => ({
  getAll(restaurantId) {
    return axios.get(`/api/restaurants/${restaurantId}/tables`, {});
  },
  
  create(restaurantId, payload) {
    return axios.post(`/api/restaurants/${restaurantId}/tables`, payload);
  },

  get(restaurantId, tableId) {
    return axios.get(`/api/restaurants/${restaurantId}/tables/${tableId}`, {});
  },

  update(restaurantId, tableId, payload) {
    return axios.put(`/api/restaurants/${restaurantId}/tables/${tableId}`, payload);
  },

  delete(restaurantId, tableId) {
    return axios.delete(`/api/restaurants/${restaurantId}/tables/${tableId}`);
  },

  setWaiter(restaurantId, waiterId, payload) {
    return axios.put(`/api/restaurants/${restaurantId}/tables/waiters/${waiterId}`, payload);
  },
});
