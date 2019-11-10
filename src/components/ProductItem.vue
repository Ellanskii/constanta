<template>
  <article class="card">
    <header class="card-header card-header--clickable" @click="isOpen = !isOpen">
      <h2 class="card-header-title">{{ product.name }}</h2>
      <div type="button" class="card-header-icon has-text-link">
        <span class="icon">
          <FaIcon icon="angle-down" />
        </span>
      </div>
    </header>
    <div v-show="isOpen">
      <div class="card-content">
        <table class="table is-fullwidth is-bordered is-striped">
          <thead>
            <tr>
              <th>Property</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, name, index) in product" :key="index">
              <td>{{ name }}</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer">
        <div class="card-footer-item">
          <button
            type="button"
            class="button is-primary"
            @click="addToCart(product)"
            :disabled="!parseInt(product.cost_in_credits)"
          >Добавить в корзину</button>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch('cart/addToCart', product);
    },
  },
};
</script>

<style lang="scss">
  .card-header--clickable {
    cursor: pointer;
  }
</style>
