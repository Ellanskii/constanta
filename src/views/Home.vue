<template>
  <div class="container">
    <SearchFilters />
    <div v-if="products.length && productsToShow.length">
      <ProductItem
        v-for="product in productsToShow"
        :key="product.name"
        :product="product"
      />
    </div>
    <p class="title" v-else-if="products.length">Nothing found(</p>
    <p class="title" v-else>Loading...</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ProductItem from '@/components/ProductItem.vue';
import SearchFilters from '@/components/SearchFilters.vue';

export default {
  name: 'home',
  components: {
    ProductItem,
    SearchFilters,
  },
  computed: {
    productsToShow() {
      let productsToShow = this.products;
      // фильтр по названию
      if (this.$route.query.search) {
        const SEARCH_QUERY = this.$route.query.search.toLowerCase();
        // eslint-disable-next-line max-len
        productsToShow = productsToShow.filter(product => product.name.toLowerCase().includes(SEARCH_QUERY));
      }
      // фильтр по классу корабля
      if (this.$route.query.class) {
        const CLASS_QUERY = this.$route.query.class;
        productsToShow = productsToShow.filter(product => product.starship_class === CLASS_QUERY);
      }
      // сортировки
      if (this.$route.query.sort) {
        const SORTING = this.$route.query.sort;
        let sorting;
        switch (SORTING) {
          case 'cost_up':
            sorting = (a, b) => a.cost_in_credits - b.cost_in_credits;
            break;
          case 'cost_down':
            sorting = (a, b) => b.cost_in_credits - a.cost_in_credits;
            break;
          case 'hyperdrive_up':
            sorting = (a, b) => a.hyperdrive_rating - b.hyperdrive_rating;
            break;
          case 'hyperdrive_down':
            sorting = (a, b) => b.hyperdrive_rating - a.hyperdrive_rating;
            break;
          default:
            break;
        }
        productsToShow = productsToShow.sort(sorting);
      }
      return productsToShow;
    },
    ...mapGetters({
      products: 'products/getProducts',
      isReadyForUpdate: 'products/isReadyForUpdate',
    }),
  },
  methods: {
    updateProducts() {
      this.$store.dispatch('products/getProducts');
    },
  },
  mounted() {
    // получаем товары
    this.updateProducts();

    // фильтр по типу корабля
    this.$store.commit('products/SET_TYPE_FILTER', { products: this.products, property: 'starship_class' });

    // повторяем получение периодически, если позволяет стор
    // не самый изящный путь, стоило бы и в корзине инфу обновлять например
    // но мне уже лень
    window.autoUpdate = setInterval(() => {
      if (this.isReadyForUpdate) {
        this.updateProducts();
      }
    }, 60000);
  },
  beforeRouteLeave(to, from, next) {
    // не забываем убить автообновление при уходе
    clearInterval(window.autoUpdate);
    next();
  },
};
</script>
