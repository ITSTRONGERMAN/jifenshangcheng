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
  import {JingpingApi} from '@/API'
export default {
    name:'Home',
    components:{
    TopBar,
    Header,
    Footer
},
created(){
    this.getData()
},
methods: {
  async getData(){
    let {data:res}=await JingpingApi()
    console.log(res);
 }
},
}
</script>

<style lang="less" scoped>

</style>