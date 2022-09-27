<template>
  <div id="app">
   <TopBar></TopBar>
   <Header></Header>
   <router-view></router-view>
   <Footer></Footer>
  </div>
</template>

<script>
  import TopBar from './components/TopBar.vue'
  import Header from '@/components/Header.vue'
  import Footer from './components/Footer.vue'
export default {
    name:'Home',
    components:{
    TopBar,
    Header,
    Footer
},
}
</script>

<style lang="less" scoped>

</style>