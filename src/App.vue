<template>
  <div id="app">
    <Log/>
  </div>
</template>

<script>
import Log from '@/components/Log.vue'

export default {
  name: 'App',
  components: {
    Log
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
