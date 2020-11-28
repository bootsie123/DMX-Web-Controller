import axios from "axios";
import router from "@/router";
import store from "@/store";

const location = window.location;

const http = axios.create({
  baseURL: location.protocol + "//" + location.hostname + ":" + process.env.VUE_APP_API_PORT,
  headers: {
    common: {
      "X-Version": process.env.VUE_APP_VERSION
    }
  }
});

const production = process.env.VUE_APP_NODE_ENV === "production";

const accessToken = localStorage.getItem("accessToken");

if (accessToken) {
  http.defaults.headers.common["x-auth-token"] = accessToken;
}

http.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    if (err.response) {
      return Promise.reject(err.response);
    } else if (err.request && !production) {
      console.error(err.request);
    } else {
      console.error("Error", err.message);
    }

    if (!production) {
      console.error(err.config);
    }

    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    const originalRequest = err.config;

    if ((err.status === 401 || err.status === 403) && originalRequest.url === "auth/token") {
      store.commit("auth/logout");

      router.push("/login");

      return Promise.reject(err.data);
    }

    if (err.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      return store
        .dispatch("auth/refresh_auth")
        .then(res => {
          if (res.status === 200) {
            originalRequest.headers["x-auth-token"] = res.data.accessToken;

            return http(originalRequest);
          }
        })
        .catch(err => {
          return Promise.reject(err);
        });
    }

    if (!err.data) {
      err.data = {
        error: {
          status: err.status,
          message: err.message || err.statusText
        }
      };
    }

    return Promise.reject(err.data);
  }
);

export default http;
