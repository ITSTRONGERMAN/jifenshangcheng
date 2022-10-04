<template>
  <div class="crumb">
    <span v-for="(n, index) in nav" :key="index">
      <span :style="{ color: index != nav.length - 1 ? '#999' : '#333' }">
      {{n.name}}
      </span>
      <i v-show="index != nav.length - 1">/</i>
    </span>
  </div>
</template>

<script>
export default {
  name: "Crumb",
  props: {
    nav: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style lang="less" scoped>
.crumb {
  margin-bottom: 15px;
  i {
    margin: 0 10px;
  }
}
</style>
