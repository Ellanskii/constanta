<template>
  <nav class="navbar is-fixed-top">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <img src="@/assets/logo.svg" width="56" height="56">
        </router-link>
        <a class="navbar-item is-size-3" href="https://github.com/Ellanskii/constanta">
          <FaIcon :icon="['fab', 'github']"/>
        </a>
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
  .has-navbar-fixed-top {
    padding-top: 4rem !important;
  }
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
  .navbar-item img {
    max-height: 56px !important;
  }
</style>
