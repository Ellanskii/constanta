<template>
  <div class="container">
    <h1 class="title">Your cart</h1>
    <table v-if="products.length" class="table is-fullwidth is-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Cost</th>
          <th>Count</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.name">
          <td>{{ product.name }}</td>
          <td>{{ product.cost }}</td>
          <td>{{ product.count }}</td>
          <td>{{ product.cost * product.count }}</td>
          <td>
            <button
              type="button"
              class="button is-danger"
              @click="remove(product.name)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5">
            <button
              type="button"
              class="button is-primary is-fullwidth"
              @click="toggleModal"
            >
              <span
                >Purchase for
                <strong>{{ total }}</strong> credits</span
              >
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
    <p v-else class="subtitle">is empty</p>
    <div class="modal" :class="{'is-active': isModalOpen}">
      <div class="modal-background" @click="toggleModal"></div>
      <div class="modal-content box">
        <OrderForm />
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        type="button"
        @click="toggleModal"
      ></button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import OrderForm from '@/components/OrderForm.vue';

export default {
  components: {
    OrderForm,
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  computed: {
    ...mapGetters({
      products: 'cart/getProducts',
      total: 'cart/getTotal',
    }),
  },
  methods: {
    remove(name) {
      this.$store.commit('cart/DELETE_PRODUCT', name);
    },
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
  },
};
</script>
