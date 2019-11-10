<template>
  <div class="filters">
    <input
      @input="search($event.target.value)"
      type="text"
      class="input"
      placeholder="Search for a starship..."
      v-model="searchQuery"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: this.$route.query.search,
    };
  },
  methods: {
    search(value) {
      this.$router.replace({ query: { search: value } });
    },
    sort(value) {
      this.$router.replace({ query: { sort: value } });
    },
  },
};
</script>

<style lang="scss">
  .filters {
    margin: 1rem 0;
  }
</style>
