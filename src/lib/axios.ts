import config from "@/config";
import axios from "axios";

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


axiosInstance.interceptors.response.use(
  (response) => {
    // console.log("response success")
    return response;
  },

  async(error) => {
    console.log("request failed", error.response)

    if(error.response.status === 500 && error.response.data.message === "jwt expired"){
      console.log("Your token has expired")
      try {
        const res = await axiosInstance.post("/auth/refresh-token");
        console.log("New access token arrived", res)
      } catch (error) {
        console.error(error)
      }
    }


    // for everything
    return Promise.reject(error);
  }
);
