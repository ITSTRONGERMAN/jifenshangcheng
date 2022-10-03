<template>
  <div class="title mb20">
    <div class="l">
      <img :src="imgicon" alt="" class="titlei-icon" />
      <span class="titletxt">{{ titletxt }}</span>
    </div>
    <div class="r">
      <span class="more"> 更多 </span>
      <img src="../assets/img/arrow.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: {
    imgicon: {},
    titletxt: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: space-between;
  .l {
    .titlei-icon {
      width: 40px;
      height: 36px;
      margin-right: 10px;
      vertical-align: bottom;
    }
    .titletxt {
      width: 119px;
      height: 29px;
      font-family: SourceHanSansSC-Bold;
      font-size: 30px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 22.81px;
      letter-spacing: 0px;
      color: #242b39;
    }
  }
  .r {
    display: flex;
    align-items: center;
    .more {
      font-family: SourceHanSansSC-Light;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 22.8px;
      letter-spacing: 0px;
      color: #666666;
      margin-right: 5px;
    }
  }
}
</style>
