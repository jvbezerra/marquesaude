import axios from 'axios'

type APIUrl = {
  [key: string]: string
};

const urls: APIUrl = {
  production: '',
  development: ''
}

const api = axios.create({
  baseURL: urls[process.env.NODE_ENV]
})

export default api