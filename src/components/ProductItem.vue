<template>
  <details :open="isOpen">
    <summary>{{ product.name }}</summary>
    <div>
      <button
        type="button"
        @click="addToCart(product)"
        :disabled="!parseInt(product.cost_in_credits)"
      >Добавить в корзину</button>
    </div>
  </details>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    product: {
      type: Object,
      required: true,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch('cart/addToCart', product);
    },
  },
};
</script>
