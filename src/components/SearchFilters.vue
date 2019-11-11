<template>
  <div class="filters">
    <div class="field">
      <label class="label">Find by name</label>
      <input
        @input="setQuery('search', $event.target.value)"
        type="text"
        class="input"
        placeholder="Search for a starship..."
        v-model="searchQuery"
      />
    </div>
    <div class="field">
      <label class="label">Starship class</label>
      <div class="select">
        <select
          v-model="classQuery"
          @input="setQuery('class', $event.target.value)"
        >
          <option value="">Any</option>
          <option
            v-for="(type, index) in productTypes"
            :key="index"
            :value="type"
          >{{ type }}</option>
        </select>
      </div>
    </div>
    <div class="field">
      <label class="label">Sorting</label>
      <div class="select">
        <select
          v-model="sortingQuery"
          @input="setQuery('sort', $event.target.value)"
        >
          <option value="cost_up">Cost up</option>
          <option value="cost_down">Cost down</option>
          <option value="hyperdrive_up">Hyperdrive class up</option>
          <option value="hyperdrive_down">Hyperdrive class down</option>
        </select>
      </div>
    </div>
    <!-- <div class="field">
      <button
        @click="resetFilters"
        type="button"
        class="button is-danger is-fullwidth"
      >Reset filters</button>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      searchQuery: this.$route.query.search,
      classQuery: this.$route.query.class,
      sortingQuery: this.$route.query.sort,
    };
  },
  computed: {
    ...mapGetters({
      productTypes: 'products/getProductTypes',
    }),
  },
  methods: {
    setQuery(name, value) {
      this.$router.replace({ query: { ...this.$route.query, [name]: value } });
    },
    resetFilters() {
      this.$router.replace({ query: {} });
    },
  },
};
</script>

<style lang="scss">
  .filters {
    margin: 1rem 0;
  }
</style>
