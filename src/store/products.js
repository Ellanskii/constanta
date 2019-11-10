import axios from 'axios';

const getters = {
  getProducts: state => state.products,
  isReadyForUpdate: state => state.isReadyForUpdate,
};

const actions = {
  async getProducts({ commit }, pagination = false) {
    // апиха может и умереть, не трогаем её, пока не порешаем эту попытку
    commit('SET_AUTO_UPDATES', false);

    let products = [];
    let pagesCount = 1;
    function getPartialData(page = 1) {
      return new Promise((resolve, reject) => {
        axios
          .get(`https://swapi.co/api/starships/?page=${page}`)
          .then((res) => {
            resolve(res.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }

    // получаем первую пачку, смотрим сколько товаров всего
    await getPartialData()
      .then((data) => {
        pagesCount = Math.ceil(data.count / 10);
        products = products.concat(data.results);
      })
      .catch(console.error);

    if (!pagination || pagesCount === 1) { // Не все товары уместились в один запрос
      const API_CALLS = [];
      for (let page = 2; page <= pagesCount; page += 1) {
        API_CALLS.push(getPartialData(page));
      }
      await Promise.all(API_CALLS).then((responses) => {
        responses.forEach((response) => {
          products = products.concat(response.results);
        });
      }).catch(console.error);
    }

    commit('SET_PRODUCTS', products);
    commit('SET_AUTO_UPDATES', true);
  },
};

const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  SET_AUTO_UPDATES(state, value) {
    state.isReadyForUpdate = value;
  },
};

const state = {
  products: [],
  isReadyForUpdate: true,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
