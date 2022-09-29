<template>
  <div class="tips">
    <i
      :class="
        type == 'success'
          ? 'iconfont icon-toast_chenggong'
          : type == 'warning'
          ? 'iconfont icon-toast-jinggao'
          : ''
      "
    ></i>
    <span>{{ msg }}</span>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Tips",
  computed: {
    ...mapState({
      msg: (state) => state.ShowTips.msg,
      type: (state) => state.ShowTips.type,
    }),
  },
};
</script>

<style lang="less" scoped>
.tips {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  padding: 10px 20px;
  border-radius: 6px;
  box-shadow: 0 0 10px #fff;
  i {
    margin-right: 8px;
  }
  .icon-toast_chenggong {
    color: green;
  }
  .icon-toast-jinggao {
    color: orange;
  }
  .icon-toast-shibai_huaban {
    color: red;
  }
}
</style>
