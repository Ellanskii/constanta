<template>
  <div class="container">
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

export default {
  name: 'home',
  components: {
    ProductItem,
  },
  computed: {
    productsToShow() {
      let productsToShow = this.products;
      if (this.$route.query.search) {
        const SEARCH_QUERY = this.$route.query.search.toLowerCase();
        // eslint-disable-next-line max-len
        productsToShow = productsToShow.filter(product => product.name.toLowerCase().includes(SEARCH_QUERY));
      }
      return productsToShow;
    },
    ...mapGetters({
      products: 'products/getProducts',
    }),
  },
};
</script>
