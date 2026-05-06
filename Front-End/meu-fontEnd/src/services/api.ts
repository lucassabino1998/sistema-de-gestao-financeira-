import axios from "axios"

export const authApi = axios.create({
  baseURL: "http://192.168.0.85:8080"
})

export const financeApi = axios.create({
  baseURL: "http://192.168.0.85:8081"
})

const adicionarToken = (config: any) => {
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}

authApi.interceptors.request.use(adicionarToken)
financeApi.interceptors.request.use(adicionarToken)