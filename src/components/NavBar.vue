<template>
  <nav class="navbar is-fixed-top">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/">
          <img src="@/assets/logo.svg" width="56" height="56">
        </router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <router-link to="/cart" class="button is-primary" :data-badge="count">Cart</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      count: 'cart/getProductsCount',
    }),
  },
};
</script>

<style lang="scss">
  [data-badge] {
    position: relative;
    &::after {
      content: attr(data-badge);
      position: absolute;
      display: block;
      top: -0.5rem;
      right: -0.5rem;
      background: tomato;
      color: white;
      border-radius: 1rem;
      padding: 0 0.5rem;
    }
  }
</style>
