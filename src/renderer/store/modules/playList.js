const state = {
  result: [],
  currentIndex: 0,
  currentMusicInfo: {}
}

const mutations = {
  addToList(state, music) {
    for (let i = 0; i < state.result.length; i++) {
      if (state.result[i].id === music.id) {
        return
      }
    }
    state.result.push(music)
    this.commit('setIndex')
  },
  removeFromList(state, index) {
    state.result.splice(index, 1)
    this.commit('setIndex')
  },
  removeAll(state) {
    state.result = []
  },
  setCurrentMusic(state, music) {
    state.currentMusicInfo = music
    this.commit('setIndex')
  },
  setContentIdByIndex(state, index) {
    state.currentMusicInfo = state.result[index]
    this.commit('setIndex')
  },
  setIndex(state) {
    state.result.forEach((e, index) => {
      if (e.id === state.currentMusicInfo.id) {
        state.currentIndex = index
      }
    })
  },
  lastMusic(state) {
    this.commit('setContentIdByIndex', state.currentIndex - 1)
  },
  nextMusic(state, value) {
    if (state.currentIndex === state.result.length - 1) {
      if (value && value === '列表播放') {
        this.commit('setContentIdByIndex', state.result.length - 1)
      } else if (value && value === '随机播放') {
        let num = Math.ceil(Math.random() * (state.result.length - 1))
        this.commit('setContentIdByIndex', state.result.length - num)
      } else {
        this.commit('setContentIdByIndex', 0)
      }
    } else {
      if (value && value === '随机播放') {
        let num = Math.floor(Math.random() * state.result.length)
        if (num === state.currentIndex) {
          num++
        }
        this.commit('setContentIdByIndex', num)
      } else {
        this.commit('setContentIdByIndex', state.currentIndex + 1)
      }
    }
  }
}

const actions = {}

export default {
  state,
  mutations,
  actions
}
