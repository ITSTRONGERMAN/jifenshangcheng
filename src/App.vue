<template>
  <div id="app">
    <TopBar></TopBar>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
    <Login v-show="isShow"></Login>
  </div>
</template>
<script>
import TopBar from "./components/TopBar.vue";
import Header from "@/components/Header.vue";
import Footer from "./components/Footer.vue";
import Login from "./components/Login.vue";
import { mapState } from 'vuex';
export default {
  components: {
    TopBar,
    Header,
    Footer,
    Login,
  },
  computed: {
    ...mapState({
      isShow:(state)=>state.ShowLoginModal.isShow
    })
  },
};
</script>

<style lang="less" scoped></style>
