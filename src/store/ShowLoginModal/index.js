export default {
  namespaced: true,
  state: {
    // 登录模态框显示状态
    isShow: false,
  },
  mutations: {
    // 改变登录模态框显示状态
    changeShowLoginModal(state, playLoad) {
      state.isShow = playLoad;
    },
  },
  actions: {},
};
