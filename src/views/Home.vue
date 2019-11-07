<template>
  <div>
    <ProductItem
      v-for="product in products"
      :key="product.name"
      :product="product"
    />
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
    ...mapGetters({
      products: 'products/getProducts',
    }),
  },
};
</script>
