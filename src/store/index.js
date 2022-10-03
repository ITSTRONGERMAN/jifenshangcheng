import Vue from "vue";
import Vuex from "vuex";
import ShowLoginModal from "./ShowLoginModal";
import LoginStatus from "./LoginStatus";
import ShowTips from "./ShowTips";
import GetUserInfo from "./GetUserInfo";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ShowLoginModal,
    LoginStatus,
    ShowTips,
    GetUserInfo,
  },
});
