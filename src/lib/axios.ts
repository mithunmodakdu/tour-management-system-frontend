import config from "@/config";
import axios, { type AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create(
  {
    baseURL: config.baseURL,
    withCredentials: true
    
  }
);



axiosInstance.interceptors.request.use(function (config) {

    return config;
  }, function (error) {
    
    return Promise.reject(error);
  },
  
);

let isRefreshing = false;

let pendingQueue: {
  resolve: (value: unknown) => void;
  reject: (value: unknown) => void;
}[] = [];

const processQueue = (error: unknown) =>{
  pendingQueue.forEach((promise) => {
    if(error){
      promise.reject(error);
    }else{
      promise.resolve(null);
    }
  });

  pendingQueue = [];

}


axiosInstance.interceptors.response.use(
  (response) => {
    // console.log("response success")
    return response;
  },

  async(error) => {
    console.log("request failed, Axios Error:", error)
    // console.log("request failed, error response from backend:", error.response)

    const originalRequest = error.config as AxiosRequestConfig & {_retry: boolean};
    // console.log("original Request:", originalRequest)


    if(error.response.status === 500 && error.response.data.message === "jwt expired" && originalRequest._retry){
      // console.log("Your token has expired")

      originalRequest._retry = true;

      if(isRefreshing){
        return new Promise((resolve, reject) => {
          pendingQueue.push({resolve, reject})
        }).then(() => axiosInstance(originalRequest))
          .catch((error) => Promise.reject(error))
      }

      isRefreshing = true;
      try {
        const res = await axiosInstance.post("/auth/refresh-token");
        console.log("New access token arrived", res)

        processQueue(null);

        return axiosInstance(originalRequest)

      } catch (error) {
        // console.error(error)
        processQueue(error);
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }


    }


    // for everything
    return Promise.reject(error);
  }
);
