<template>
  <div v-if="!type" class="main">
    <div v-for="(lyric,index) in lyricsMap['lyrics']" :key="index">{{lyric}}</div>
  </div>
  <span v-else>{{lyricsMap['lyrics']?lyricsMap['lyrics'][currentIndex]:null}}</span>
</template>

<script>
import net from '../../util/http'
export default {
  props: ['type', 'currentSecond'],
  data() {
    return {
      lyricsMap: {},
      currentIndex: 0
    }
  },
  computed: {
    lyricUrl() {
      return this.$store.state.playList.currentMusicInfo.lyricUrl
    }
  },
  watch: {
    lyricUrl() {
      this.searchLyrics()
    },
    currentSecond() {
      if (!this.lyricsMap['time'] && this.currentSecond < 1) {
        this.searchLyrics()
      } else {
        const timenow = parseFloat(this.currentSecond.toFixed(2))
        if (
          this.currentIndex < this.lyricsMap['time'].length - 1 &&
          timenow > this.lyricsMap['time'][this.currentIndex + 1]
        ) {
          this.currentIndex++
        }
      }
    }
  },
  methods: {
    searchLyrics() {
      if (this.lyricUrl) {
        net.get(this.lyricUrl).then(value => {
          this.parseLyrics(value.data)
        })
      }
    },
    parseLyrics(lyrics) {
      const arr = lyrics.split('\n')
      const lyricsMap = {}
      const lyricsArr = []
      const time = []
      for (let content of arr) {
        const line = content.substr(1).split(']')
        time.push(this.minToSecond(line[0]))
        lyricsArr.push(line[1])
      }
      lyricsMap['time'] = time
      lyricsMap['lyrics'] = lyricsArr
      this.lyricsMap = lyricsMap
    },
    minToSecond(time) {
      // time = 02:03.09
      const arr = time.split(':')
      return parseInt(arr[0]) * 60 + parseFloat(arr[1])
    }
  }
}
</script>

<style scoped>
.main {
  margin-top: 3px;
  display: flex;
  flex-direction: column;
  margin-left: 30px;
}
</style>
