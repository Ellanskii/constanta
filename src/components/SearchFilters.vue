<template>
  <div class="filters">
    <div class="field">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      searchQuery: this.$route.query.search,
      classQuery: this.$route.query.class,
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
