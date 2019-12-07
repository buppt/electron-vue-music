<template>
  <div class="main">
    <span
      class="back"
      :style="backArr.length===0?'color:#ccc;cursor: not-allowed;':'color:#000;cursor: pointer;'"
      @click="goBack"
    >
      <i class="el-icon-arrow-left"></i>
    </span>
    <span
      class="back"
      :style="frontArr.length===0?'color:#ccc;cursor: not-allowed;':'color:#000;cursor: pointer;'"
      @click="goFront"
    >
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
      searchText: '',
      lastSearch: '',
      backArr: [],
      frontArr: []
    }
  },
  methods: {
    search() {
      this.$store.dispatch('search', {
        searchText: this.searchText,
        currentPage: 1
      })
      if (this.lastSearch) {
        this.backArr.push(this.lastSearch)
      }
      this.lastSearch = this.searchText
    },
    goBack() {
      if (this.backArr.length === 0) {
        return
      }
      this.frontArr.push(this.searchText)
      const text = this.backArr.pop()
      this.searchText = text
      this.$store.dispatch('search', {
        searchText: this.searchText,
        currentPage: 1
      })
    },
    goFront() {
      if (this.frontArr.length === 0) {
        return
      }
      this.backArr.push(this.searchText)
      const text = this.frontArr.pop()
      this.searchText = text
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
  cursor: pointer;
}
.searchButton {
  padding: 0 8px;
  margin-left: 5px;
  font-size: 13px;
}
</style>
