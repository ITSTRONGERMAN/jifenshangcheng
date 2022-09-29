<template>
  <div id="topbar">
    <div class="wrap">
      <div class="l">欢迎来到叩丁狼积分商城</div>
      <div class="r">
        <ul>
          <li @click="toShowTips">
            <img
              src="../assets/img/userImg.f8bbec5e.png"
              alt=""
              class="avatar"
            />用户名：游客
          </li>
          <li>我的积分：--</li>
          <li>获取积分</li>
          <li>叩丁狼官网</li>
          <li class="login-btn" @click="toLogin" v-show="!isLogined">登录</li>
          <li class="car-btn" v-show="isLogined">
            <img src="../assets/img/cart.png" alt="" />
            <span>购物车</span>
            <b>{{ totalCar }}</b>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "TopBar",
  data() {
    return {
      // 购物车总数量
      totalCar: 0,
      // 定时器
      timer: null,
    };
  },
  computed: {
    ...mapState({
      isLogined: (state) => state.LoginStatus.isLogined,
    }),
  },
  methods: {
    ...mapMutations({
      changeShowLoginModal: "ShowLoginModal/changeShowLoginModal",
      changeShowTips: "ShowTips/changIsShowTips",
    }),
    // 登录页面
    toLogin() {
      this.changeShowLoginModal(true);
    },
    // 通过验证登录是否成功,从而显示不同的提示
    toShowTips() {
      this.changeShowTips({ isShow: true, msg: "登录成功", type: "success" });
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.changeShowTips({ isShow: false, msg: "登录成功", type: "success" });
      }, 2000);
    },
  },
};
</script>

<style lang="less" scoped>
#topbar {
  width: 100%;
  height: 40px;
  background-color: #242b39;
  .wrap {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    font-family: SourceHanSansSC-Light;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    color: #fffefe;
    .r {
      ul {
        display: flex;
        justify-content: space-around;
        li {
          display: flex;
          align-items: center;
          margin-left: 20px;
          cursor: pointer;
          &.login-btn {
            width: 124px;
            height: 40px;
            background-color: var(--basecolor);
            text-align: center;
            justify-content: center;
          }
          &.car-btn {
            width: 124px;
            height: 40px;
            background-color: var(--basecolor);
            justify-content: center;
            img {
              margin-right: 10px;
            }
            b {
              width: 22px;
              height: 22px;
              text-align: center;
              line-height: 22px;
              margin-left: 8px;
              background: #f40;
              border-radius: 50%;
            }
          }
          .avatar {
            width: 23px;
            height: 22px;
            border-radius: 50%;
            background-color: #242b39;
            margin-right: 6px;
          }
        }
      }
    }
  }
}
</style>
