// 对axios进行封装
import axios from "axios";
// 创建axios实例
const instance = axios.create({
  baseURL: "/api",
  timeout: 5000,
});
// 创建请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 什么时候执行这个函数？在请求发出之前
    // config是什么？ 是一个对象，保存了关于这次请求的信息
    // 这个函数是用来做什么的？ 可以用来做一些请求前的准备（比如：添加请求头）
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
// 创建响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 这个函数什么时候执行？后端返回数据并在组贱内部处理之前执行
    // res 是axios封装的关于本次的响应
    // 这个函数是用来做什么的？对服务器响应回来的数据进行统一处理
    var res_data = res.data;
    // 判断请求是否发送成功，0为成功，其他均为失败
    if (res_data.code!= 0) {
      alert(res_data.msg||res_data.message);
      return;
    }
    return res_data;
  },
  (err) => {
    alert(err);
    return Promise.reject(err);
  }
);
export default instance;
