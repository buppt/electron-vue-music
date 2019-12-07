<template>
  <div class="main">
    <div class="left">
      <i class="el-icon-caret-left playIcon" @click="lastMusic"></i>
      <i
        :class="play?'el-icon-video-pause playIcon':'el-icon-video-play playIcon'"
        style="margin: 0 15px"
        @click="clickPlay"
      ></i>
      <i class="el-icon-caret-right playIcon" @click="nextMusic"></i>
    </div>
    <div>
      <div class="right">
        <img :src="imgUrl" style="width:30px;height:30px" />
        <el-dropdown @command="setQuality" style="margin-left:5px">
          <span class="el-dropdown-link">
            {{quality}}
            <i class="el-icon-arrow-down"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="无损">无损</el-dropdown-item>
            <el-dropdown-item command="高品">高品</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-slider class="timeLine" v-model="timeLine" @change="setTime"></el-slider>
        <span style="margin-left:5px">{{`${currentTime}/${maxTime}`}}</span>
        <i class="el-icon-headset volumeIcon"></i>
        <el-slider class="volume" v-model="volume" @input="setVolume"></el-slider>
      </div>
      <span style="color: #616266;font-size:12px">
        {{musicName}}
        <lyrics type="line" :currentSecond="currentSecond" />
      </span>
    </div>
    <el-button @click="openLyrics" class="rightButton">查看歌词</el-button>

    <audio ref="audio" :src="url" v-show="false">您的浏览器不支持 audio 标签。</audio>
  </div>
</template>

<script>
import Lyrics from '../Lyrics'
export default {
  components: {
    Lyrics
  },
  data() {
    return {
      audio: null,
      play: false,
      maxTime: '00:00',
      currentTime: '00:00',
      currentSecond: 0,
      timeLine: 0,
      volume: 50,
      timeout: null,
      quality: '高品'
    }
  },
  mounted() {
    this.audio = this.$refs['audio']
  },
  watch: {
    contentId() {
      this.playMusic()
    }
  },
  computed: {
    contentId() {
      return this.$store.state.playList.currentMusicInfo.contentId
    },
    musicName() {
      return this.$store.state.playList.currentMusicInfo.name
    },
    url() {
      const toneFlag = this.quality === '高品' ? 'HQ' : 'SQ'
      const resourceType = this.quality === '高品' ? '2' : 'E'
      return `http://app.pd.nf.migu.cn/MIGUM2.0/v1.0/content/sub/listenSong.do?toneFlag=${toneFlag}&netType=00&userId=15548614588710179085069&ua=Android_migu&version=5.1&copyrightId=0&contentId=${this.contentId}&resourceType=${resourceType}&channel=1`
    },
    imgUrl() {
      const img = this.$store.state.playList.currentMusicInfo.imgItems
      if (img) {
        return img.filter(e => e.imgSizeType === '01')[0].img
      } else {
        return ''
      }
    }
  },
  methods: {
    openLyrics() {
      if (this.$route.path === '/lyrics') {
        this.$router.push({ path: '/search/' })
      } else {
        this.$router.push({ path: '/lyrics' })
      }
    },
    clickPlay() {
      if (this.audio.paused) {
        this.playMusic()
      } else {
        clearInterval(this.timeout)
        this.audio.pause()
        this.play = false
      }
    },
    playMusic() {
      clearInterval(this.timeout)
      this.audio.play()
      this.play = true
      this.audio.onended = () => {
        clearInterval(this.timeout)
        this.nextMusic()
      }
      this.timeout = setInterval(() => {
        this.watchTime()
        if (this.audio.paused) {
          this.audio.play()
        }
      }, 1000)
    },
    secondToMin(time) {
      if (typeof time === 'number' && !isNaN(time)) {
        return `${Math.floor(time / 60)}:${
          Math.floor(time % 60) < 10
            ? '0' + Math.floor(time % 60)
            : Math.floor(time % 60)
        }`
      } else {
        return '00:00'
      }
    },
    watchTime() {
      this.currentSecond = this.audio.currentTime
      this.maxTime = this.secondToMin(this.audio.duration)
      this.currentTime = this.secondToMin(this.audio.currentTime)
      this.timeLine = (this.audio.currentTime / this.audio.duration) * 100
    },
    setTime(value) {
      this.audio.currentTime = (value * this.audio.duration) / 100
    },
    setVolume(value) {
      this.audio.volume = value / 100
    },
    setQuality(value) {
      this.quality = value
    },
    lastMusic() {
      this.$store.commit('lastMusic')
    },
    nextMusic() {
      this.$store.commit('nextMusic')
    }
  }
}
</script>

<style scoped>
.main {
  height: 100%;
  display: flex;
  align-items: center;
}
.left {
  width: 250px;
  display: flex;
  justify-content: center;
}
.playIcon {
  font-size: 30px;
  color: #5bc483;
  cursor: pointer;
}
.el-dropdown-link {
  cursor: pointer;
  font-size: 12px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.right {
  flex: 1;
  display: flex;
  align-items: center;
  color: #c0c0c0;
  font-size: 14px;
}
.timeLine {
  margin-left: 10px;
  width: 300px;
}
.volumeIcon {
  margin-left: 10px;
  margin-right: 3px;
}
.volume {
  width: 50px;
}
.rightButton {
  padding: 5px 10px;
  margin-left: 15px;
}
</style>
