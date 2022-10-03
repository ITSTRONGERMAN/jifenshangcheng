<template>
  <div class="footer-b">
    <div class="heart wrap">
      <div class="footer-i">
        <h2>
          <a href=""><img src="../assets/img/slogan.7730f7f2.png" alt="" /></a>
        </h2>
        <p style="line-height: 1.6em">
          叩丁狼是一家专注于培养高级IT技术人才，为学员提供定制化IT职业规划方案及意见咨询服务的教育科技公司，为您提供海量优质课程，以及创新的线上线下学习体验，帮助您获得全新的个人发展和能力提升。
        </p>
      </div>
      <ul>
        <li>
          <img src="../assets/img/wx.5584e874.png" alt="" />
          <a href="javascript:;">微信公众号</a>
        </li>
        <li><a href="javascript:;">新浪微博</a></li>
        <li>
          <img src="../assets/img/service.848ec511.png" alt="" />
          <a href="javascript:;">在线客服</a>
        </li>
      </ul>
      <div class="footer-r">
        <p>全国免费咨询热线</p>
        <h3>020-85628002</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
 
<style lang = "less" scoped>
.footer-b {
  width: 100%;
  /* margin-top: 20px; */
  height: 240px;
  background: #242b39;
  .heart {
    display: flex;
    justify-content: space-between;
    .footer-i {
      padding-top: 32px;
      p {
        padding-top: 27px;
        width: 426px;
        height: 55px;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #7d879a;
      }
    }
    ul {
      margin-top: 123px;
      width: 293px;
      display: flex;
      justify-content: space-between;
      li {
        border-right: 1px solid #9e9e9e;
        height: 20px;
        position: relative;
        text-align: center;
        img {
          position: absolute;
          left: -20%;
          top: -110px;
          display: none;
        }
        &:hover {
          img {
            display: block;
          }
        }
        a {
          height: 19px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #7d879a;
          padding-right: 16px;
          text-decoration: none;
        }
        &:last-child {
          border-right: 0;
        }
      }
    }
    .footer-r {
      padding-top: 90px;
      p {
        width: 117px;
        height: 14px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #7d879a;
      }
      h3 {
        margin-top: 10px;
        width: 220px;
        height: 22px;
        font-size: 28px;
        font-family: SourceHanSansSC;
        font-weight: bold;
        color: #ffffff;
      }
    }
  }
}
</style>