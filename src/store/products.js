import axios from 'axios';
import uniq from 'lodash-es/uniq';

const getters = {
  getProducts: state => state.products,
  isReadyForUpdate: state => state.isReadyForUpdate,
  getProductTypes: state => state.productTypes,
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
      .catch();

    if (!pagination || pagesCount === 1) { // Не все товары уместились в один запрос
      const API_CALLS = [];
      for (let page = 2; page <= pagesCount; page += 1) {
        API_CALLS.push(getPartialData(page));
      }
      await Promise.all(API_CALLS).then((responses) => {
        responses.forEach((response) => {
          products = products.concat(response.results);
        });
      }).catch();
    }

    commit('SET_PRODUCTS', products);
    commit('SET_TYPE_FILTER', { products, property: 'starship_class' });
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
  SET_TYPE_FILTER(state, { products, property }) {
    state.productTypes = uniq(
      products.map(product => product[property]),
    );
  },
};

const state = {
  products: [],
  isReadyForUpdate: true,
  productTypes: [], // фильтр по свойству
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
