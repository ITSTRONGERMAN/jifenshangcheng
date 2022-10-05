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
// 获取用户信息api
export const GetUserInfoAPI = () => request.get("/shop/userProfiles");
// 商品详情api
export const ProductDetailAPI = (id) => request.get(`/products/${id}`);
// 加入购物车api
export const JoionCartAPI = (params) =>
  request.post("/shop/carts/add", qs.stringify(params));
// 商品搜索（含首页的“更多”）
export const ProductSearchAPI = (params) =>
  request.get("/products", { params });
// 购物车信息
export const GetCartInfoAPI = () => request.get("/shop/carts");
