import axios from 'axios'

interface Service<T> {
  create: (data: T) => Promise<T>,
  edit: (id: number, data: Partial<T>) => Promise<T>,
  exclude: (id: number) => Promise<T>,
}

type Routes = 'appointments' | 'bookings' | 'employees' | 'roles' | 'units' | 'users'

const api = axios.create({ baseURL: '/api' })
const useAPI = <T>(route: Routes): Service<T> => {
  const create = async (data: T): Promise<T> => {
    return api.post(`/${route}`, data)
  }
  
  const edit = async (id: number, data: Partial<T>): Promise<T> => {
    return api.put(`/${route}?id=${id}`, data)
  }
  
  const exclude = async (id: number): Promise<T> => {
    return api.delete(`/${route}?id=${id}`)
  }

  return {
    create,
    edit,
    exclude
  }
}

export default useAPI