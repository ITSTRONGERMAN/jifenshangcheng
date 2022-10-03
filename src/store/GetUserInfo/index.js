import { GetUserInfoAPI } from "@/API";
const state = {
  // 购物车数量
  cartTotal: 0,
  userInfo: {
    // 用户名称
    nickName: "游客",
    // 鸡腿数
    coin: "0",
    // 头像
    headImg: require("@/assets/img/userImg.f8bbec5e.png"),
  },
};
const mutations = {
  CHANGEUSERINFO(state, res) {
    state.cartTotal = res.cartTotal;
    state.userInfo = res.userInfo;
  },
  initUserInfo(state) {
    // 购物车数量
    (state.cartTotal = 0),
      (state.userInfo = {
        // 用户名称
        nickName: "游客",
        // 鸡腿数
        coin: "0",
        // 头像
        headImg: require("@/assets/img/userImg.f8bbec5e.png"),
      });
  },
};
const actions = {
  async changeUserInfo({ commit }) {
    let { data: res } = await GetUserInfoAPI();
    commit("CHANGEUSERINFO", res);
  },
};
export default {
  namesaced: true,
  state,
  mutations,
  actions,
};
