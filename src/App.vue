<template>
  <div id="app">
    <TopBar></TopBar>
    <Header></Header>
      <keep-alive exclude="AllProduct,Details">
        <router-view></router-view>
      </keep-alive>
    <Footer></Footer>
    <Login v-show="isShowLogin"></Login>
    <transition name="tip">
      <Tips v-show="isShowTips"></Tips>
    </transition>
  </div>
</template>
<script>
import TopBar from "./components/TopBar.vue";
import Header from "@/components/Header.vue";
import Footer from "./components/Footer.vue";
import Login from "./components/Login.vue";
import { mapState } from "vuex";
import Tips from "./components/Tips.vue";
export default {
  components: {
    TopBar,
    Header,
    Footer,
    Login,
    Tips,
  },
  computed: {
    ...mapState({
      // 导入控制登录模态框显示的变量
      isShowLogin: (state) => state.ShowLoginModal.isShow,
      // 导入控制提示框显示的变量
      isShowTips: (state) => state.ShowTips.isShowTips,
    }),
  },
};
</script>

<style lang="less" scoped>
.tip-enter {
  opacity: 0;
}
.tip-enter-active,
.tip-leave-active {
  transition: all 0.3s linear;
}
.tip-enter-to,
.tip-leave {
  opacity: 1;
}
</style>
