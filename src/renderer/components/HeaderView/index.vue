<template>
  <div class="main">
    <span class="back">
      <i class="el-icon-arrow-left"></i>
    </span>
    <span class="back">
      <i class="el-icon-arrow-right"></i>
    </span>
    <el-input
      size="small"
      placeholder="搜索"
      style="width: 200px;margin-left:10px"
      v-model="searchText"
      @keyup.enter.native="search"
    />
    <el-button icon="el-icon-search" class="searchButton" @click="search">搜索</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: ''
    }
  },
  methods: {
    search() {
      this.$store.dispatch('search', {
        searchText: this.searchText,
        currentPage: 1
      })
    }
  }
}
</script>

<style scoped>
.main {
  margin-top: 3px;
}
.back {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.searchButton {
  padding: 0 8px;
  margin-left: 5px;
  font-size: 13px;
}
</style>
