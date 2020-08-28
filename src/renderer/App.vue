<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'music-player'
}
</script>

<style>
html {
  height: 100%;
}
body {
  padding: 0;
  margin: 0;
  height: 100%;
}
#app {
  height: 100%;
}
.el-tooltip.el-slider__button {
  width: 10px;
  height: 10px;
}
</style>
