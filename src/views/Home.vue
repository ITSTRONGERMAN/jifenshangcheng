<template>
  <div class="home wrap">
    <div class="banner">
      <img src="../assets/img/banner.f559b49d.png" alt="" />
    </div>
    <Title
      :imgicon="require('@/assets/img/jingpin.png')"
      :titletxt="'精品推荐'"
    ></Title>
    <div class="product-list mb20">
      <ProductBox
        v-for="(p, index) in jingpinProducts"
        :key="index"
        :imgSrc="p.coverImg"
        :productName="p.name"
        :jifen="p.coin"
        :isHot="p.isHotSale"
        :isNew="p.isLatest"
      ></ProductBox>
    </div>
    <Title
      :imgicon="require('@/assets/img/hot.png')"
      :titletxt="'热门兑换'"
    ></Title>
    <div class="av-panel">
      
    </div>
  </div>
</template>

<script>
import Title from "@/components/Title.vue";
import ProductBox from "@/components/ProductBox.vue";
import { JingpinAPI } from "@/API";
export default {
  name: "Home",
  components: { Title, ProductBox },
  data() {
    return {
      jingpinProducts: [],
    };
  },
  mounted() {
    this.getJingpinData();
  },
  methods: {
    getJingpinData() {
      JingpinAPI()
        .then((result) => {
          this.jingpinProducts = result.data.data.records;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  .banner {
    width: 1200px;
    height: 446px;
    background-color: #fdc432;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .product-list {
    width: 100%;
    margin-top: 20px;
    display: flex;
  }
}
</style>
