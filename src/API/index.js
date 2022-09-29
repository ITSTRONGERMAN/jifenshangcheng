// 统一管理所以的请求路径
import request from './request'
import qs from 'qs'
// 精品推荐Api
export const JingpingAPi=()=>request.get('/products/recommend')
// 手机短信验证码api
export const SendSmsAPI=(params)=>request.post('/sendSMS',qs.stringify(params))
// 发送登录请求
export const SendLoginRequest=(params)=>request.post('/phoneRegin',qs.stringify(params))