// https://itnext.io/quickly-building-restful-uis-in-nuxtjs-782bce539440

export const state = () => ({
  list: [],
  waiterList: [],
  roleList: [{
      link: 'admin',
      name: 'Admin'
    },
    {
      link: 'managers',
      name: 'Manager'
    },
    {
      link: 'chiefs',
      name: 'Chief'
    },
    {
      link: 'waiters',
      name: 'Waiter'
    }
  ],
  selectedRole: null,
  selectedEmployee: null,
  selectedAdmin: null,
  selectedManager: null,
});

export const mutations = {
  setList(state, payload) {
    state.list = payload
  },
  setWaiterList(state, payload) {
    state.waiterList = payload
  },
  setSelectedRole(state, payload) {
    state.selectedRole = payload
  },
  setSelectedEmployee(state, payload) {
    state.selectedEmployee = payload
  },
  setSelectedAdmin(state, payload) {
    state.selectedAdmin = payload
  },
  setSelectedManager(state, payload) {
    state.selectedManager = payload
  },
};

export const actions = {
  async getAll({
    commit
  }, {
    restaurantId
  }) {
    return await this.$api.employees
      .getAll(restaurantId)
      .then((res) => {
        if (res.status === 200) {
          commit('setList', res.data)
        }
        return res;
      })
      .catch((res) => {
        this.$toast.error('Error While Loading Employees...');
        return res;
      });
  },
  async getAllWaiters({
    commit
  }, {
    restaurantId
  }) {
    return await this.$api.employees
      .getAllWaiters(restaurantId)
      .then((res) => {
        if (res.status === 200) {
          commit('setWaiterList', res.data)
        }
        return res;
      })
      .catch((res) => {
        this.$toast.error('Error While Loading Waiters...');
        return res;
      });
  },
  async get({
    commit
  }, {
    restaurantId,
    employeeId
  }) {
    return await this.$api.employees
      .get(restaurantId, employeeId)
      .then((res) => {
        if (res.status === 200) {
          commit('setList', res.data)
        }
        return res;
      })
      .catch((res) => {
        this.$toast.error('Error While Loading Employee Details...');
        return res;
      });
  },
  async create({
    dispatch
  }, {
    restaurantId,
    role,
    payload
  }) {
    return await this.$api.employees
      .create(restaurantId, role, payload)
      .then((res) => {
        if (res.status === 201) {
          dispatch("getAll", {
            restaurantId
          })
        }
        return res;
      })
      .catch((res) => {
        this.$toast.error('Error While Creating Employee...');
        return res;
      });
  },
  async update({
    dispatch
  }, {
    restaurantId,
    employeeId,
    payload
  }) {
    return await this.$api.employees
      .update(restaurantId, employeeId, payload)
      .then((res) => {
        if (res.status === 200) {
          dispatch("getAll", {
            restaurantId
          })
        }
        return res;
      })
      .catch((res) => {
        this.$toast.error('Error While Updating Employee...');
        return res;
      });
  },
  async delete({
    dispatch
  }, {
    restaurantId,
    employeeId
  }) {
    return await this.$api.employees
      .delete(restaurantId, employeeId)
      .then((res) => {
        if (res.status === 204) {
          dispatch("getAll", {
            restaurantId
          })
        }
        return res;
      })
      .catch((res) => {
        this.$toast.error('Error While Deleting Employee...');
        return res;
      });
  },
  async active({
    dispatch
  }, {
    restaurantId,
    employeeId
  }) {
    return await this.$api.employees
      .active(restaurantId, employeeId)
      .then((res) => {
        if (res.status === 200) {
          dispatch("getAll", {
            restaurantId
          })
        }
        return res;
      })
      .catch((res) => {
        this.$toast.error('Error While Activating Employee...');
        return res;
      });
  },
  async block({
    dispatch
  }, {
    restaurantId,
    employeeId
  }) {
    return await this.$api.employees
      .block(restaurantId, employeeId)
      .then((res) => {
        if (res.status === 200) {
          dispatch("getAll", {
            restaurantId
          })
        }
        return res;
      })
      .catch((res) => {
        this.$toast.error('Error While Blocking Employee...');
        return res;
      });
  },
  async promoteWaiter({
    dispatch
  }, {
    restaurantId,
    employeeId
  }) {
    return await this.$api.employees
      .promoteWaiter(restaurantId, employeeId)
      .then((res) => {
        if (res.status === 200) {
          dispatch("getAll", {
            restaurantId
          })
        }
        return res;
      })
      .catch((res) => {
        this.$toast.error('Error While Promoting Waiter...');
        return res;
      });
  },
  async promoteChief({
    dispatch
  }, {
    restaurantId,
    employeeId
  }) {
    return await this.$api.employees
      .promoteChief(restaurantId, employeeId)
      .then((res) => {
        if (res.status === 200) {
          dispatch("getAll", {
            restaurantId
          })
        }
        return res;
      })
      .catch((res) => {
        this.$toast.error('Error While Promoting Chief...');
        return res;
      });
  },
  async demoteToWaiter({
    dispatch
  }, {
    restaurantId,
    employeeId
  }) {
    return await this.$api.employees
      .demoteToWaiter(restaurantId, employeeId)
      .then((res) => {
        if (res.status === 200) {
          dispatch("getAll", {
            restaurantId
          })
        }
        return res;
      })
      .catch((res) => {
        this.$toast.error('Error While Demoting To Waiter...');
        return res;
      });
  },
  async demoteToChief({
    dispatch
  }, {
    restaurantId,
    employeeId
  }) {
    return await this.$api.employees
      .demoteToChief(restaurantId, employeeId)
      .then((res) => {
        if (res.status === 200) {
          dispatch("getAll", {
            restaurantId
          })
        }
        return res;
      })
      .catch((res) => {
        this.$toast.error('Error While Demoting To Chief...');
        return res;
      });
  },
};
