<template>
  <form @submit.prevent="submit">
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input
          v-model="name"
          class="input"
          type="text"
          placeholder="Enter your name"
          required
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Race</label>
      <div class="control">
        <input
          v-model="race"
          class="input"
          type="text"
          placeholder="Just another gungan"
          required
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Delivery date</label>
      <div class="control">
        <input
          v-model="date"
          class="input"
          type="text"
          placeholder="Backend will parse anything"
          required
        />
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button
          type="submit"
          class="button is-primary is-fullwidth has-text-weight-bold"
        >Order!</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      race: '',
      date: '',
    };
  },
  methods: {
    submit() {
      // some checkout logic

      this.$store.commit('cart/CLEAR_CART');
      this.$router.push('/');
    },
  },
};
</script>
