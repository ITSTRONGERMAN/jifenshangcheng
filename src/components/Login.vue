<template>
  <div class="login-modal">
    <div class="mask" @click="close"></div>
    <div class="login-box">
      <div class="close-btn" @click="close">
        <img src="../assets/img/close.png" alt="" />
      </div>
      <div class="title">
        <ul>
          <li :class="isShowForm ? 'active' : ''" @click="isShowForm = true">
            手机号码登录
          </li>
          <li style="margin: -2px 10px 0; cursor: none">|</li>
          <li @click="toShowWeixin" :class="isShowForm ? '' : 'active'">
            微信登录
          </li>
        </ul>
      </div>
      <div class="body">
        <div class="form" v-show="isShowForm">
          <div class="ipt-group uname">
            <input
              type="text"
              ref="phone"
              placeholder="请输入手机号"
              v-model.trim="phoneNumber"
            />
          </div>
          <div class="ipt-group mb20">
            <slide-verify
              :l="42"
              :r="20"
              :w="360"
              :h="140"
              @success="onSuccess"
              @fail="onFail"
              @refresh="onRefresh"
              :style="{ width: '100%' }"
              class="slide-box"
              ref="slideBlock"
              :sliderText="msg"
            ></slide-verify>
          </div>
          <div class="ipt-group code mb20">
            <input
              type="text"
              placeholder="请输入验证码"
              v-model.trim="smsCode"
            />
            <div class="btn" :class="isShowCount ? 'has-count' : ''">
              <span v-show="!isShowCount" @click="getVerificationCode"
                >获取验证码</span
              >
              <span v-show="isShowCount">{{ count }}s</span>
            </div>
          </div>
          <div class="btn" @click="submitLogin">登录</div>
        </div>
        <div class="qrcode" v-show="!isShowForm" id="weixin"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
// 导入获取数据验证码的api
import {
  SendSmsAPI,
  PhoneBindWexinAPI,
  SendLoginRequestAPI,
  WeixinLoginAPI,
} from "@/API";
// 导入验证手机号是否正确的方法
import verifyPhoneNumber from "@/utils/verifyPhoneNumber";
export default {
  name: "LoginBox",
  data() {
    return {
      // 控制表单盒子是否隐藏
      isShowForm: true,
      // 滑块提示文字
      msg: "请向右滑动",
      // 用户输入的手机号
      phoneNumber: "19937714073",
      // 控制倒计时的显示
      isShowCount: false,
      // 倒计时数字
      count: 60,
      // 短信验证码
      smsCode: "34545",
    };
  },
  methods: {
    ...mapMutations({
      changeShowLoginModal: "ShowLoginModal/changeShowLoginModal",
      changeIsLogined: "LoginStatus/changeIsLogined",
    }),
    ...mapActions({
      asyncchangeIsShowTips: "ShowTips/asyncchangeIsShowTips",
    }),
    toShowWeixin() {
      this.isShowForm = false;
      let _this = this;
      new WxLogin({
        id: "weixin",
        appid: "wx67cfaf9e3ad31a0d", // 这个appid要填死
        scope: "snsapi_login",
        // 扫码成功后重定向的接⼝
        redirect_uri: "https://sc.wolfcode.cn/cms/wechatUsers/shop/PC",
        // state填写编码后的url
        state: encodeURIComponent(
          window.btoa("http://127.0.0.1:8080" + _this.$route.path)
        ),
        // 调⽤样式⽂件
        href: `data:text/css;base64,Lyogd3hsb2dpbi5jc3MgKi8NCi5pbXBvd2VyQm94IC50aXRsZSwgLmltcG93ZXJCb3ggLmluZm97DQogIGRpc3BsYXk6IG5vbmU7DQp9DQoNCi5pbXBvd2VyQm94IC5xcmNvZGV7DQogIG1hcmdpbi1ib3R0b206IC0yMHB4Ow0KfQ==
              `,
      });
    },
    close() {
      this.changeShowLoginModal(false);
    },
    // 滑块验证成功
    onSuccess(times) {
      let ms = (times / 1000).toFixed(1);
      this.msg = "验证成功, 耗时 " + ms + "s";
    },
    // 滑块拼图失败
    onFail() {
      this.onRefresh(); // 重新刷新拼图
    },
    // 拼图刷新
    onRefresh() {
      this.msg = "再试⼀次";
    },
    // 点击登录执行这里的回调
    async submitLogin() {
      if (!this.verifyForm()) {
        return;
      }
      if (!this.smsCode) {
        this.asyncchangeIsShowTips({
          type: "warning",
          msg: "短信验证码不能为空",
        });
        return;
      }
      // 根据有没有uuid从而发出对应请求
      let uuid = localStorage.getItem("uuid");
      let res = null;
      if (uuid) {
        res = await PhoneBindWexinAPI({
          phone: this.phoneNumber,
          verifyCode: this.smsCode,
          uuid: uuid,
        });
      } else {
        res = await SendLoginRequestAPI({
          phone: this.phoneNumber,
          verifyCode: this.smsCode,
        });
      }
      if (!res) return;
      this.asyncchangeIsShowTips({ type: "success", msg: "登录成功" });
      this.close();
      // 本地存储token
      localStorage.setItem("x-auth-token", res["x-auth-token"]);
      this.changeIsLogined(true);
      // 删除本地存储中的uuid
      if (uuid) {
        localStorage.removeItem("uuid");
        // 清除浏览器路径中的code
        this.$router.push(this.$route.path)
      }
    },
    // 验证表单是否正确的函数
    verifyForm() {
      // 验证滑块是否验证成功
      if (this.msg == "再试一次" || this.msg == "请向右滑动") {
        this.asyncchangeIsShowTips({ type: "warning", msg: "滑块验证未验证" });
        return false;
      }
      // 验证手机号输入格式是否正确
      var isTrue = verifyPhoneNumber(this.phoneNumber);
      if (!isTrue) {
        this.asyncchangeIsShowTips({
          type: "warning",
          msg: "请输入正确的手机号",
        });
        this.$refs.phone.focus();
        this.phoneNumber = "";
        return false;
      }
      return true;
    },
    // 点击获取验证码执行这里的函数
    async getVerificationCode() {
      if (!this.verifyForm()) {
        return;
      }
      // 获取短信验证码
      let res = await SendSmsAPI({ phone: this.phoneNumber });
      if (res) {
        this.asyncchangeIsShowTips({ type: "success", msg: "短信发送成功" });
        this.countDown();
        this.isShowCount = true;
      }
    },
    // 倒计时变化
    countDown() {
      let timer = setInterval(() => {
        this.count--;
        // 判断count是否为0
        if (this.count <= 0) {
          clearInterval(timer);
          this.isShowCount = false;
        }
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.login-modal {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2123;
  .mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .login-box {
    width: 555px;
    height: 423px;
    background: url("../assets/img/login-box-bg.png");
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    .close-btn {
      position: absolute;
      right: 60px;
      top: 15px;
      cursor: pointer;
    }
    .title ul {
      display: flex;
      padding-top: 45px;
      color: #ccc;
      font-size: 18px;
      justify-content: center;
      .active {
        color: #333;
      }
      li {
        cursor: pointer;
      }
    }
    .body {
      width: 360px;
      margin: 0 auto;
      margin-top: 30px;
      .form {
        .uname {
          margin-bottom: 5px;
        }
        .ipt-group {
          display: flex;
          input {
            width: 100%;
            height: 50px;
            text-indent: 10px;
            border: 1px solid #ccc;
            box-sizing: border-box;
          }
          .has-count {
            background: #ccc;
          }
          /deep/.slide-box {
            width: 100%;
            position: relative;
            box-sizing: border-box;
            canvas {
              position: absolute;
              left: 0;
              top: -120px;
              display: none;
              width: 100%;
              box-sizing: border-box;
            }
            .slide-verify-block {
              width: 85px;
              height: 136px;
            }
            .slide-verify-refresh-icon {
              top: -120px;
              display: none;
            }
            &:hover {
              canvas {
                display: block;
              }
              .slide-verify-refresh-icon {
                display: block;
              }
            }
          }
        }
        .code input {
          width: 260px;
          margin-right: 8px;
          height: 50px;
          box-sizing: border-box;
        }
        .code .btn {
          flex: 1;
        }
        .btn {
          height: 50px;
          line-height: 50px;
          text-align: center;
          cursor: pointer;
          background: var(--basecolor);
          color: #fff;
        }
      }
      .qrcode {
        margin-top: -20px;
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
