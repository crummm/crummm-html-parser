<template>
  <div id="app">
    <Demo></Demo>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Demo from './components/Demo.vue';

  export default Vue.extend({
    name: 'app',
    components: {
      Demo
    }
  });
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
