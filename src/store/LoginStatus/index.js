const state = {
  // 用来表示用户登录状态
  isLogined: localStorage.getItem("x-auth-token")?true:false,
};
const mutations = {
  changeIsLogined(state,paylaod) {
    state.isLogined=paylaod
  },
};
export default {
  namespaced: true,
  state,
  mutations,
};
