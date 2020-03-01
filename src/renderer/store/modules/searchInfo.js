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
    const url = `http://m.music.migu.cn/migu/remoting/scr_search_tag?rows=20&type=2&keyword=${encodeURI(
      searchText
    )}&&pgc=${currentPage}`
    net
      .get(url)
      .then(value => {
        commit('setTotal', value.data.pgt)
        commit('setResult', value.data.musics)
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
