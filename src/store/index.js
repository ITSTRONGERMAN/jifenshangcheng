import Vue from 'vue'
import Vuex from 'vuex'
import ShowLoginModal from './ShowLoginModal'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ShowLoginModal,
  }
})
