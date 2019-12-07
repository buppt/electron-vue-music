<template>
  <div class="main">
    <div class="searchRow" v-for="(content,index) in result" :key="content.id">
      <span>{{(currentPage-1)*10+index+1}}.</span>
      <span @click="playMusic(content)">{{content.name}}</span>
      <span style="margin-left:15px">{{showName(content.singers)}}</span>
      <el-button
        icon="el-icon-circle-plus-outline"
        class="searchButton"
        @click="addToList(content)"
      >添加到列表</el-button>
    </div>

    <el-pagination
      :hide-on-single-page="total<=10"
      layout="prev, pager, next"
      :page-size="10"
      :total="parseInt(total)"
      @current-change="handlePageChange"
      style="margin-top: 25px"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1
    }
  },
  computed: {
    total() {
      return this.$store.state.searchInfo.total
    },
    result() {
      return this.$store.state.searchInfo.result
    }
  },
  methods: {
    playMusic(content) {
      this.$store.commit('setCurrentMusic', content)
    },
    showName(singers) {
      return singers
        .reduce((a, b) => {
          a.push(b.name)
          return a
        }, [])
        .join('/')
    },
    handlePageChange(page) {
      this.currentPage = page
      this.$store.dispatch('search', {
        searchText: '',
        currentPage: page
      })
    },
    addToList(content) {
      this.$store.commit('addToList', content)
    }
  }
}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  overflow: auto;
  margin-left: 30px;
}
.searchRow {
  cursor: pointer;
  margin-top: 5px;
}
.searchButton {
  padding: 3px 8px;
  margin-left: 5px;
  font-size: 13px;
}
</style>
