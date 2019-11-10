import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import products from '@/store/products';
import cart from '@/store/cart';

Vue.use(Vuex);

export default new Vuex.Store({
  // храним корзину на клиенте (заодно и остальное, а то апиха полумёртвая)
  plugins: [createPersistedState()],
  modules: {
    products,
    cart,
  },
});
