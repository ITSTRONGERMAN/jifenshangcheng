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
          <li @click="isShowForm = false" :class="isShowForm ? '' : 'active'">
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
        <div class="qrcode" v-show="!isShowForm">二维码</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
// 导入获取数据验证码的api
import { SendSmsAPI } from "@/API";
// 导入发送登录请求的方法
import { SendLoginRequest } from "@/API";
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
        alert("请输入验证码");
        return;
      }
      let res = await SendLoginRequest({
        phone: this.phoneNumber,
        verifyCode: this.smsCode,
      });
      if (res) {
        alert("登录成功");
        this.close();
        // 本地存储token
        localStorage.setItem("x-auth-token", res["x-auth-token"]);
        this.changeIsLogined(true);
      }
    },
    // 验证表单是否正确的函数
    verifyForm() {
      // 验证滑块是否验证成功
      if (this.msg == "再试一次" || this.msg == "请向右滑动") {
        alert("滑块失败");
        return false;
      }
      // 验证手机号输入格式是否正确1
      var isTrue = verifyPhoneNumber(this.phoneNumber);
      if (!isTrue) {
        alert("请输入正确的手机号");
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
        alert("短信验证码发送成功");
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
    }
  }
}
</style>
