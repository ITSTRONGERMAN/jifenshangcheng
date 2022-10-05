<template>
  <div class="goods">
    <div class="wrap">
      <!-- <Crumb> </Crumb> -->
      <img src="../assets/img/banner.4c6b6225.png" width="100%" alt="" />
      <ul class="options">
        <li>
          <strong>排序：</strong>
          <span
            v-for="(item, index) in sort"
            :key="index"
            :class="sortNum == index ? 'active' : ''"
            @click="
              sortActive({
                index: index,
                min: item.min,
                max: item.max,
              })
            "
            >{{ item.txt }}</span
          >
        </li>
        <li>
          <strong>分类：</strong>
          <span
            v-for="(item, index) in classification"
            :key="index"
            :class="classificationNum == index ? 'active' : ''"
            @click="classificationActive(index, item.type)"
          >
            {{ item.txt }}
          </span>
        </li>
      </ul>
      <div class="product-list">
        <ProductBox
          v-for="item in goodsList"
          :key="item.id"
          :imgSrc="item.coverImg"
          :productName="item.name"
          :jifen="item.coin"
          :isHot="item.isHotSale"
          :isNew="item.isLatest"
          :id="item.id"
        ></ProductBox>
      </div>
    </div>
  </div>
</template>
<script>
import Crumb from "../components/Crumb.vue";
import { ProductSearchAPI } from "@/API";
import ProductBox from "@/components/ProductBox.vue";
export default {
  data() {
    return {
      name:'AllProduct',
      // 商品列表
      goodsList: [],
      // 栏目目前可提供的参数为：0为全部产品，1为精品推荐，2为热门产品
      did: 0,
      // 产品种类0为全部，1为实体产品，2为虚拟产品
      type: 0,
      // 大于多少积分，最少是0
      min: 0,
      // 少于多少积分，最多是10000，当传入0的时候，会直接返回所有商品，无视后台逻辑。
      max: 0,
      // 商品关键字
      keyword: "",
      // 商品排序
      sort: [
        {
          min: 0,
          max: 10000,
          txt: "全部",
        },
        {
          min: 0,
          max: 0,
          txt: "我还可以兑换",
        },
        {
          min: 0,
          max: 500,
          txt: "0-500分",
        },
        {
          min: 500,
          max: 1000,
          txt: "0-1000分",
        },
        {
          min: 1000,
          max: 1500,
          txt: "1000-1500分",
        },
        {
          min: 1500,
          max: 2500,
          txt: "1500-2500分",
        },
        {
          min: 2500,
          max: 6500,
          txt: "2500-6500分",
        },
        {
          min: 6500,
          max: 10000,
          txt: "6500-10000",
        },
      ],
      // 商品分类
      classification: [
        {
          type: 0,
          txt: "全部",
        },
        {
          type: 1,
          txt: "实体礼品",
        },
        {
          type: 2,
          txt: "虚拟礼品",
        },
      ],
      sortNum: 0,
      classificationNum: 0,
    };
  },
  components: {
    Crumb,
    ProductBox,
  },
  watch:{
    '$route.query.keyword'(newval,oldval){
      this.keyword=newval
      this.getGoodsSearch()
    }
  },
  created() {
    this.getGoodsSearch();
  },
  methods: {
    async getGoodsSearch() {
      this.keyword = this.$route.query.keyword || "";
      let res = await ProductSearchAPI({
        did: this.did,
        type: this.type,
        min: this.min,
        max: this.max,
        keyword: this.keyword,
      });
      if (res.code !== 0) return;
      this.goodsList = res.data;
    },
    // 排序触发事件
    sortActive(data) {
      this.sortNum = data.index;
      this.min = data.min;
      this.max = data.max;
      this.getGoodsSearch();
    },
    // 分类触发事件
    classificationActive(index, type) {
      this.classificationNum = index;
      this.type = type;
      this.getGoodsSearch();
    },
  },
};
</script>

<style lang="less" scoped>
.goods {
  padding-bottom: 50px;
  background: #efefef;
  padding-top: 20px;
  .product-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    :nth-child(4n) {
      margin-right: 0 !important;
    }
  }
  .options {
    padding-top: 20px;
    padding-bottom: 40px;
    li {
      margin-top: 20px;
      strong {
        color: #000;
        font-weight: bold;
      }
      span {
        margin-right: 20px;
        margin-left: 10px;
        cursor: pointer;
        color: #999;
        &.active {
          color: var(--basecolor);
          font-weight: bold;
        }
      }
    }
  }
}
</style>
