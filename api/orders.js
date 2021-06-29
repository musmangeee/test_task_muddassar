export default axios => ({
    getAll(restaurantId) {
        return axios.get(`/api/restaurants/${restaurantId}/orders`, {});
      },


});