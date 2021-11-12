import axios from 'axios'
import { toast } from 'react-toastify'

type APIUrl = {
  [key: string]: string
}

const urls: APIUrl = {
  production: 'https://marquesaude.herokuapp.com',
  development: 'http://localhost:3333'
}

const api = axios.create({
  baseURL: urls[process.env.NODE_ENV]
})

api.interceptors.request.use(() => {}, error => toast.error(error))
api.interceptors.response.use(() => {}, error => toast.error(error))

export const GeneralService = <T>(url: string) => {
  const create = async (data: T): Promise<T> => {
    const { data: newItem } = await api.post(`${url}`, data)
    return newItem
  }
  
  const edit = async (id: number, data: Partial<T>): Promise<T> => {
    const { data: updatedItem } = await api.put(`/${url}/${id}`, data)
    return updatedItem
  }
  
  const exclude = async (id: number) => {
    await api.delete(`/${url}/${id}`)
  }

  return {
    create,
    edit,
    exclude
  }
}

export default api