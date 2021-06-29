// import axios from "axios";
// axios.delete({}, );

export default axios => ({
  getAll(restaurantId) {
    return axios.get(`/api/restaurants/${restaurantId}/employees`, {});
  },

  getAllWaiters(restaurantId) {
    return axios.put(`/api/restaurants/${restaurantId}/employees/waiters`);
  },

  get(restaurantId, employeeId) {
    return axios.get(`/api/restaurants/${restaurantId}/employees/${employeeId}`, {});
  },

  update(restaurantId, employeeId, payload) {
    return axios.put(`/api/restaurants/${restaurantId}/employees/${employeeId}`, payload);
  },

  delete(restaurantId, employeeId) {
    return axios.delete(`/api/restaurants/${restaurantId}/employees/${employeeId}`);
  },

  create(restaurantId, role, payload) {
    return axios.post(`/api/restaurants/${restaurantId}/employees/${role}`, payload);
  },

  block(restaurantId, employeeId) {
    return axios.put(`/api/restaurants/${restaurantId}/employees/${employeeId}/block`);
  },

  active(restaurantId, employeeId) {
    return axios.put(`/api/restaurants/${restaurantId}/employees/${employeeId}/activate`);
  },

  promoteWaiter(restaurantId, employeeId) {
    return axios.put(`/api/restaurants/${restaurantId}/employees/waiters/${employeeId}/promote`);
  },

  promoteChief(restaurantId, employeeId) {
    return axios.put(`/api/restaurants/${restaurantId}/employees/chiefs/${employeeId}/promote`);
  },

  demoteToWaiter(restaurantId, employeeId) {
    return axios.put(`/api/restaurants/${restaurantId}/employees/managers/${employeeId}/demote/waiter`);
  },

  demoteToChief(restaurantId, employeeId) {
    return axios.put(`/api/restaurants/${restaurantId}/employees/managers/${employeeId}/demote/chief`);
  },

});
