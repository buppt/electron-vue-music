<template>
  <div class="main">
    <header class="title">播放列表</header>
    <div class="total">
      总共{{result.length}}首
      <el-button class="delete" icon="el-icon-delete" @click="removeAll">清空</el-button>
    </div>
    <ol class="list">
      <li v-for="(music,index) in result" :key="music.id" class="menu">
        <span @click="playMusic(music)">{{music.name}}</span>
        <span style="margin-left:10px">{{showName(music.singers)}}</span>
        <i class="el-icon-remove-outline" @click="remove(index)"></i>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    result() {
      return this.$store.state.playList.result
    }
  },
  methods: {
    showName(singers) {
      return singers
        .reduce((a, b) => {
          a.push(b.name)
          return a
        }, [])
        .join('/')
    },
    playMusic(content) {
      this.$store.commit('setCurrentMusic', content)
    },
    remove(index) {
      this.$store.commit('removeFromList', index)
    },
    removeAll() {
      this.$store.commit('removeAll')
    }
  }
}
</script>

<style scoped>
.main {
  height: 100%;
  background: rgba(237, 237, 237, 0.9);
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 2px 10px;
  overflow: auto;
}
.title {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.total {
  font-size: 13px;
  position: relative;
}
.delete {
  padding: 4px;
  position: absolute;
  right: 0;
  font-size: 12px;
}
.list {
  margin-top: 10px;
  font-size: 14px;
  padding-left: 15px;
}
.menu {
  cursor: pointer;
  margin-top: 5px;
}
</style>
