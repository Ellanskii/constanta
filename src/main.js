import Vue from 'vue';

// eslint-disable-next-line
import bulma from 'bulma';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
// eslint-disable-next-line
import brands from '@fortawesome/fontawesome-free-brands';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueYandexMetrika from 'vue-yandex-metrika';
import store from './store';
import router from './router';
import App from './App.vue';

library.add(faAngleDown, brands);
Vue.component('FaIcon', FontAwesomeIcon);

Vue.use(VueYandexMetrika, {
  id: 56179357,
  router,
  env: process.env.NODE_ENV,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
