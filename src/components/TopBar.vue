<template>
  <div id="topbar">
    <div class="wrap">
      <div class="l">欢迎来到叩丁狼积分商城</div>
      <div class="r">
        <ul>
          <li>
            <img
              src="../assets/img/userImg.f8bbec5e.png"
              alt=""
              class="avatar"
            />
            用户名：游客
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
import { mapActions, mapMutations, mapState } from "vuex";
import { WeixinLoginAPI } from "@/API";
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
  created() {
    this.wechatLogin();
  },
  watch: {
    "$route.path":{
      immediate:true,
      handler(newval, oldval) {
        this.changeIsLogined(Boolean(localStorage.getItem('x-auth-token')));
      }
    },
  },
  computed: {
    ...mapState({
      isLogined: (state) => state.LoginStatus.isLogined,
    }),
  },
  methods: {
    ...mapMutations({
      changeShowLoginModal: "ShowLoginModal/changeShowLoginModal",
      changeIsLogined: "LoginStatus/changeIsLogined",
    }),
    ...mapActions({
      asyncchangeIsShowTips: "ShowTips/asyncchangeIsShowTips",
    }),
    // 登录页面
    toLogin() {
      this.changeShowLoginModal(true);
    },
    // 微信扫码登录
    async wechatLogin() {
      /*微信扫码得到的code，code超过2分钟会过期，
      过期的code去做请求会返回400，
      需要重新扫码获取e.query.code;*/
      let myCode = this.$route.query.code;
      // 根据判断接口返还code而进行不同操作.
      if (myCode) {
        let res = await WeixinLoginAPI({ code: myCode });
        // 服务器的状态码
        let code = res.code;
        /*0代表成功,400请重新扫描，407代表需要用户手机再做一次验证码登录*/
        if (code == 0) {
          this.$router.push(this.$route.path);
          this.changeIsLogined(true);
          // 本地
          localStorage.setItem('x-auth-token',res['x-auth-token'])
        } else if (code == 400) {
          this.asyncchangeIsShowTips({
            type: "warning",
            msg: "微信二维码已经失效，请重新扫码登录",
          });
          this.changeShowLoginModal(true);
        } else if (code == 407) {
          this.asyncchangeIsShowTips({
            type: "warning",
            msg: "请使用手机号绑定登录微信",
          });
          localStorage.setItem("uuid", res.uuid);
        }
      }
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
