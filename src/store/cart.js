const getters = {
  getProducts: state => state.products,
  // eslint-disable-next-line arrow-body-style
  getTotal: state => state.products.reduce((subtotal, product) => {
    return subtotal + product.cost * product.count;
  }, 0),
};

const actions = {
//   async getProducts({ commit }) {
//     await axios
//       .get('https://swapi.co/api/starships')
//       .then((res) => {
//         commit('SET_PRODUCTS', res.data.results);
//       })
//       .catch();
//   },
  addToCart({ commit }, product) {
    commit('ADD_PRODUCT', product);
  },
};

const mutations = {
  ADD_PRODUCT(state, product) {
    const productInCart = state.products.find(cartItem => cartItem.name === product.name);
    if (productInCart) {
      productInCart.count += 1;
    } else {
      const newProduct = {
        name: product.name,
        cost: product.cost_in_credits * 1,
        count: 1,
      };
      state.products.push(newProduct);
    }
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
