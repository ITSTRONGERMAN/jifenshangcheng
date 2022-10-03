<template>
  <div class="detail">商品详情页</div>
</template>

<script>
import { ProductDetailAPI } from "@/API";
export default {
  name: "ProductDetail",
  created() {
    this.getProductDetail()
  },
  methods:{
   async getProductDetail(){
      let {data:res}=await ProductDetailAPI(this.$route.query.id)
      console.log(res);
    }
  }
};
</script>

<style></style>
