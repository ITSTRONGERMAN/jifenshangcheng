const state = {
  // 控制提示库显示
  isShowTips: false,
  // 提示框提示信息
  msg: "",
  // 提示框类型
  type: "",
};
const mutations = {
  // 控制提示框显示的方法
  changeIsShowTips(state, payload) {
    state.isShowTips = payload.isShow;
    state.msg = payload.msg;
    state.type = payload.type;
  },
};
const actions = {
  // 异步控制提示框显示的方法
  asyncchangeIsShowTips({ commit }, payload) {
    commit("changeIsShowTips", {
      isShow: true,
      msg: payload.msg,
      type: payload.type,
    });
    // 3秒后提示框关闭
    setTimeout(() => {
      commit("changeIsShowTips", {
        isShow: false,
        msg: payload.msg,
        type: payload.type,
      });
    }, 3000);
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
