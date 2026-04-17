import axios from 'axios'

const client = axios.create({
  baseURL: '/api', // 代理后实际请求后端
  timeout: 60000, // 诊断可能耗时较长
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
client.interceptors.request.use(
  (config) => {
    // 可添加token等
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export default client