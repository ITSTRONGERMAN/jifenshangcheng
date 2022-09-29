const state = {
    // 控制提示库显示
  isShowTips: false,
  // 提示框提示信息
  msg:'',
  // 提示库类型
  type:''
};
const mutations = {
    // 控制提示库显示的方法
  changIsShowTips(state, payload) {
    state.isShowTips = payload.isShow;
    state.msg=payload.msg
    state.type=payload.type
  },
};
export default {
  namespaced: true,
  state,
  mutations,
};
