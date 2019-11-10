const getters = {
  getProducts: state => state.products,
  // eslint-disable-next-line arrow-body-style
  getTotal: state => state.products.reduce((subtotal, product) => {
    return subtotal + product.cost * product.count;
  }, 0),
  getProductsCount: state => state.products.reduce((acc, product) => acc + product.count, 0),
};

const actions = {
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
  DELETE_PRODUCT(state, name) {
    const productToRemoveIndex = state.products.findIndex(product => product.name === name);
    if (productToRemoveIndex >= 0) {
      state.products.splice(productToRemoveIndex, 1);
    }
  },
  CLEAR_CART(state) {
    state.products = [];
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
