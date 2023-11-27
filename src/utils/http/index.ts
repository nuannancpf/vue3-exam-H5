import Axios, {
  type AxiosInstance,
  type AxiosError,
  type AxiosResponse,
  type AxiosRequestConfig
} from "axios";
// import { ContentTypeEnum, ResultEnum } from "@/enums/requestEnum";
import { ResultEnum } from "./enum"
import NProgress from "../progress";
// import "vant/es/toast/style";
// * 请求响应参数(不包含data)
interface Result {
  code: string;
  msg: string;
}

// * 请求响应参数(包含data)
interface ResultData<T = any> extends Result {
  data?: T;
}

// 默认 axios 实例请求配置
const config = {
  headers: {
    "Content-Type": 'application/json;charset=utf-8'
  },
  timeout: 0,
  baseURL: import.meta.env.VITE_BASE_API,
};


class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    this.service = Axios.create(config)

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
     */
    this.service.interceptors.request.use((request: AxiosRequestConfig) => {
      NProgress.start();
      const token = localStorage.getItem("TOKEN")
      if (token) {
        request.headers.token = token
      }
      // return { ...request, headers: { ...request.headers, "x-access-token": token } };
      return request
    }, (error: AxiosError) => {
      // showFailToast(error.message);
      return Promise.reject(error);
    })
    /**
       * @description 响应拦截器
       *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
       */
    this.service.interceptors.response.use((response: AxiosResponse) => {
      const { data } = response
      if (data.code === ResultEnum.OVERDUE) {
        return Promise.reject(data);
      }
      // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
      if (data.code && data.code !== ResultEnum.SUCCESS) {
        // ElMessage.error(data.msg);
        return Promise.reject(data);
      }
      return data
    },
      async (error: AxiosError) => {
        // 请求超时单独判断，因为请求超时没有 response
        NProgress.done();
        // 处理 HTTP 网络错误
        let message = "";
        // HTTP 状态码
        const status = error.response?.status;
        switch (status) {
          case 400:
            message = "请求错误";
            break;
          case 401:
            message = "未授权，请登录";
            break;
          case 403:
            message = "拒绝访问";
            break;
          case 404:
            message = `请求地址出错: ${error.response?.config?.url}`;
            break;
          case 408:
            message = "请求超时";
            break;
          case 500:
            message = "服务器内部错误";
            break;
          case 501:
            message = "服务未实现";
            break;
          case 502:
            message = "网关错误";
            break;
          case 503:
            message = "服务不可用";
            break;
          case 504:
            message = "网关超时";
            break;
          case 505:
            message = "HTTP版本不受支持";
            break;
          default:
            message = "网络连接故障";
        }
        // showFailToast(error.message);
        return Promise.reject(error);
      })
  }
  // * 常用请求方法封装
  get<T>(url: string, params?: object | {}, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object);
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object });
  }
}
export default new RequestHttp(config);
