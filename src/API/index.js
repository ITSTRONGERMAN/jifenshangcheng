// 统一管理所以的请求路径
import request from './request'
// 精品推荐Api
export const JingpingApi=()=>request.get('/products/recommend')