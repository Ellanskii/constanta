import axios from 'axios';

const getters = {
  getProducts: state => state.products,
};

const actions = {
  async getProducts({ commit }) {
    await axios
      .get('https://swapi.co/api/starships')
      .then((res) => {
        commit('SET_PRODUCTS', res.data.results);
      })
      .catch();
  },
};

const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
};

const state = {
  products: [],
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
