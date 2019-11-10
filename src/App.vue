<template>
  <div id="app">
    <NavBar />
    <main>
      <router-view/>
    </main>
    <footer class="footer">
      <div class="container"></div>
    </footer>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar,
  },
};
</script>

<style lang="scss">
  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .footer {
    margin-bottom: 0;
    margin-top: auto;
  }
</style>
