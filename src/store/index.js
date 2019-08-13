/* 整合各个模块，并导出vuex实例 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import getters from './getter.js'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
