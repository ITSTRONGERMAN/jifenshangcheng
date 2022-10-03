<template>
  <div class="product-box" @click="goToDetails()">
    <div class="img">
      <img :src="'http://sc.wolfcode.cn' + imgSrc" alt="" />
    </div>
    <div class="product-detail">
      <h2 class="mt22 product-name">{{ productName }}</h2>
      <h2 class="mt22 jifen">{{ jifen }}积分</h2>
      <div class="btn">立即兑换</div>
    </div>
    <div class="hot" v-show="isHot">
      <img src="../assets/img/section_hot.png" alt="" />
    </div>
    <div class="new" v-show="isNew">
      <img src="../assets/img/section_new.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductBox",
  props: ["imgSrc", "jifen", "productName", "isNew", "isHot", "id"],
  methods: {
    goToDetails() {
      this.$router.push({
        name: "productdetail",
        query:{
          id:this.id
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.product-box {
  width: 285px;
  height: 412px;
  background: #fff;
  transition: all 0.5s;
  position: relative;
  margin-right: 20px;
  margin-top: 10px;
  &:hover {
    transform: translateY(-6px);
  }
  .img {
    width: 100%;
    height: 250px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .product-detail {
    .product-name {
      font-size: 18px;
      line-height: 23px;
      letter-spacing: 0px;
      color: #333333;
      text-align: center;
    }
    .jifen {
      font-size: 18px;
      line-height: 23px;
      letter-spacing: 0px;
      color: #fd604d;
      text-align: center;
    }
    .btn {
      width: 100px;
      height: 36px;
      border: solid 1px #0a328e;
      text-align: center;
      line-height: 36px;
      font-size: 18px;
      color: var(--basecolor);
      margin: 0 auto;
      margin-top: 10px;
      cursor: pointer;
    }
    .mt22 {
      margin-top: 22px;
    }
  }
  .hot,
  .new {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
