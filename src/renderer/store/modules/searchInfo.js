import net from '../../util/http'
const state = {
  total: 0,
  searchText: '',
  pageSize: 10,
  result: []
}

const mutations = {
  setTotal(state, number) {
    state.total = number
  },
  setResult(state, result) {
    state.result = result
  },
  setSearchText(state, text) {
    state.searchText = text
  }
}

const actions = {
  search({ commit, state }, obj) {
    let { searchText, currentPage } = obj
    if (searchText) {
      commit('setSearchText', searchText)
    } else {
      searchText = state.searchText
    }
    const url = `http://pd.musicapp.migu.cn/MIGUM2.0/v1.0/content/search_all.do?&ua=Android_migu&version=5.0.1&text=${encodeURI(
      searchText
    )}&pageNo=${currentPage}&pageSize=${
      state.pageSize
    }&searchSwitch={"song":1,"album":0,"singer":0,"tagSong":0,"mvSong":0,"songlist":0,"bestShow":1}`
    net
      .get(url)
      .then(value => {
        commit('setTotal', value.data.songResultData.totalCount)
        commit('setResult', value.data.songResultData.result)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export default {
  state,
  mutations,
  actions
}
