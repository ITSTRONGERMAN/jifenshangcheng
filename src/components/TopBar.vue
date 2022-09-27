<template>
  <div id="topbar">
   <div class="wrap">
    <div class="l">
        欢迎来到叩丁狼积分商城
    </div>
    <div class="r">   
        <ul>
            <li><img src="../assets/img/userImg.f8bbec5e.png" alt="">用户名：游客 </li>
            <li>我的积分：--   </li>
            <li>获取积分</li>
            <li>叩丁狼官网</li>
            <li class="loginbtn">
                登录
            </li>
        </ul>
       
    </div>
   </div>
  </div>
</template>

<script>
export default {
    name:'TopBar'
}
</script>

<style lang="less" scoped>
    #topbar{
	width: 100%;
	height: 40px;
	background-color: #242b39;
    .wrap{
        display: flex;
        justify-content: space-between;
        line-height: 40px;
        font-family: SourceHanSansSC-Light;
	    font-size: 14px;
	    font-weight: normal;
	    font-stretch: normal;
        color: #fffefe;
        .r{
            ul{
                display: flex;
                 justify-content: space-around;
            li{
                display: flex;
                align-items: center;
                margin-left: 20px;
                cursor: pointer;
                &.loginbtn{
                width: 124px;
	            height: 40px;
	            background-color: #0a328e;
                text-align: center;
                justify-content: center;
            }
                img{
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