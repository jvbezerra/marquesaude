import axios from 'axios'

type APIUrl = {
  [key: string]: string
};

const urls: APIUrl = {
  production: 'https://marquesaude.herokuapp.com',
  development: 'http://localhost:3333'
}

const api = axios.create({
  baseURL: urls[process.env.NODE_ENV]
})

export default api