// 统一管理所以的请求路径
import request from "./request";
import qs from "qs";
// 精品推荐api
export const JingpinAPI = () => request.get("/products/recommend");
// 手机短信验证码api
export const SendSmsAPI = (params) =>
  request.post("/sendSMS", qs.stringify(params));
// 发送登录请求api
export const SendLoginRequestAPI = (params) =>
  request.post("/phoneRegin", qs.stringify(params));
// 微信登录api
export const WeixinLoginAPI = (params) =>
  request.post("/wechatUsers/PCLogin", qs.stringify(params));
// 热门商品api
export const HotProductAPI = () => request.get("/products/hot");
// 手机绑定微信api
export const PhoneBindWexinAPI = (params) =>
  request.post("/wechatUsers/binding", qs.stringify(params));
