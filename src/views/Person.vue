<template>
  <div class="person_page">
    <div class="person wrap">
      <Crumb :nav="[{ name: '首页' }, { name: '个人中心' }]"></Crumb>
      <main>
        <aside>
          <div
            class="avatar"
            :style="{ backgroundImage: `url(${userInfo.headImg})` }"
          ></div>
          <div class="name">
            {{ userInfo.nickName }}
            <span @click="loginOutFn" style="cursor: pointer">[退出]</span>
          </div>
          <div class="title">
            <img
              src="../assets/img/transaction.png"
              width="20"
              alt="交易管理"
            />
            交易管理
          </div>
          <ul class="list">
            <li :class="/\/person1/g.test($route.path) ? 'active' : ''">
              个人中心
            </li>
            <router-link
              to="/person/cart"
              :class="/\/person1/g.test($route.path) ? 'active' : ''"
            >
              我的订单
            </router-link>
            <li :class="/\/cart/g.test($route.path) ? 'active' : ''">购物车</li>
            <li :class="/\/person1/g.test($route.path) ? 'active' : ''">
              消息通知
            </li>
            <li :class="/\/person1/g.test($route.path) ? 'active' : ''">
              积分明细
            </li>
            <li :class="/\/person1/g.test($route.path) ? 'active' : ''">
              积分攻略
            </li>
          </ul>
          <div class="title">
            <img
              src="../assets/img/transaction.png"
              width="20"
              alt="交易管理"
            />
            个人信息管理
          </div>
          <ul class="list">
            <li>地址管理</li>
            <li>账号安全</li>
          </ul>
        </aside>
        <article><router-view></router-view></article>
      </main>
    </div>
  </div>
</template>
<script>
import Crumb from "@/components/Crumb.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import store from "@/store";
export default {
  data() {
    return {};
  },
  beforeRouteEnter(to, from, next) {
    let token = localStorage.getItem("x-auth-token");
    if (to.path === "/person/cart") {
      if (!token) {
        store.dispatch("ShowTips/asyncchangeIsShowTips", {
          isShow: true,
          type: "warning",
          msg: "检测到您未登录!请先登录",
        });
        return;
      }
    }
    console.log(2131);
    next();
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.GetUserInfo.userInfo,
    }),
  },
  components: {
    Crumb,
  },
  methods: {
    ...mapActions({
      asyncchangeIsShowTips: "ShowTips/asyncchangeIsShowTips",
    }),
    ...mapMutations({
      initUserInfo: "GetUserInfo/initUserInfo",
    }),
    loginOutFn() {
      localStorage.removeItem("x-auth-token");
      this.asyncchangeIsShowTips({
        type: "success",
        msg: "退出登录成功",
      });
      this.initUserInfo();
      setTimeout(() => {
        this.$router.push("/home");
      }, 2000);
    },
  },
};
</script>
<style lang="less" scoped>
.person_page {
  background: #fff;
  main {
    border-top: 1px solid #e1e1e1;
    padding: 28px 0 48px;
    display: flex;
    justify-content: space-between;
    background: #fff;
    aside {
      width: 200px;
      height: 740px;
      background: #e7e7e7;
      margin-right: 60px;
      box-sizing: border-box;
      padding: 30px 18px 0;
      .avatar {
        width: 100px;
        height: 100px;
        margin: auto;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .name {
        text-align: center;
        margin-top: 19px;
        margin-bottom: 43px;
        span {
          text-decoration: underline;
          color: #2a5df1;
        }
      }
      .title {
        font-size: 16px;
        color: #333333;
        display: flex;
        align-items: center;
        margin-bottom: 14px;
        img {
          margin-right: 6px;
        }
      }
      .list {
        li {
          margin-bottom: 17px;
          font-weight: 300;
          color: #666666;
          cursor: pointer;
          &.active {
            color: var(--basecolor);
            font-weight: bold;
            &::before {
              width: 2px;
              height: 14px;
              background: var(--basecolor);
              display: inline-block;
              content: "";
              margin-right: 10px;
            }
          }
        }
      }
    }
    article {
      flex: 1;
      padding: 20px 0 0 0px;
      box-sizing: border-box;
      background: #fff;
    }
  }
}
</style>
