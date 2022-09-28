<template>
  <div class="header wrap">
    <h1 class="logo"><img src="../assets/img/indexLogo.6f8ac4f0.png" alt=""></h1>
    <div class="nav">
        <ul>
        <li><router-link to="/home" active-class="active">首页</router-link></li>
        <li><router-link to="/allproduct" active-class="active">全部商品</router-link></li>
        <li><router-link to="/person" active-class="active">个人中心</router-link></li>
        <li><router-link to="/myorder" active-class="active">我的订单</router-link></li>
        <li><router-link to="/mywelfare" active-class="active">专属福利</router-link></li>
        </ul>
        </div>
    <div class="search">
        <input type="text" placeholder="请输入关键字">
        <div class="searchbtn"><img src="../assets/img/search.png" alt=""></div>
    </div>
  </div>
</template>

<script>
export default {
    name:'Header'
}
</script>

<style lang="less" scoped>
.header{
    height: 118px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .nav{
        ul{
            width: 500px;
            display: flex;
            justify-content: space-between;
            font-family: SourceHanSansSC-Medium;
	        font-size: 16px;
	        font-weight: normal;
	        font-stretch: normal;
	        line-height: 22.81px;
	        letter-spacing: 0px;
            .active{
                color: var(--basecolor);
                font-weight: 700;
            }
        }
    }
    .search {
        display: flex;
        align-items: center;
        input{
            width: 214px;
	        height: 38px;
	        border-radius: 20px 0px 0px 20px;
	        border: solid 1px #dedede;
            text-indent: 10px;
        }
        .searchbtn{
            width: 50px;
	        height: 40px;
	        background-color: #0a328e;
	        border-radius: 0px 20px 20px 0px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
    }
}
</style>