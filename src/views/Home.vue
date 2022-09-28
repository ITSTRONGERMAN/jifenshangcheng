<template>
  <div class="home wrap">
    <div class="banner">
      <img src="../assets/img/banner.f559b49d.png" alt="">
    </div>
    <Title :imgicon="require('@/assets/img/jingpin.png')" :titletxt="'精品推荐'"></Title>
    
  </div>
</template>

<script>
  import Title from '@/components/Title.vue'
export default {
    components: { Title }
}
</script>

<style lang="less" scoped>
.home{
  .banner{
    width: 1200px;
	  height: 446px;
	  background-color: #fdc432;
    margin-bottom: 20px;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>