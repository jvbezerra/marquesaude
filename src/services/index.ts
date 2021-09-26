import api from './api'

export const authenticate = async (key: string, password: string) => {
  const { data } = await api.get('/auth/signin', {
    auth: {
      username: key,
      password,
    }
  })

  return data
}

// UNIT
export const editUnit = async (id: number, data: Unit | any): Promise<Unit> => {
  const { data: updatedUnit } = await api.put(`/units/${id}`, data)
  return updatedUnit
}

// USER
export const createUser = async (data: MSUser): Promise<MSUser> => {
  const { data: newUser } = await api.post('/users', data)
  return newUser
}

export const editUser = async (id: number, data: MSUser | any): Promise<MSUser> => {
  const { data: updatedUser } = await api.put(`/users/${id}`, data)
  return updatedUser
}

export const deleteUser = async (id: number) => {
  await api.delete(`/users/${id}`)
}

// EMPLOYEES
export const createEmployee = async (data: Employee): Promise<Employee> => {
  const { data: newEmployee } = await api.post('/employees', data)
  return newEmployee
}

export const editEmployee = async (id: number, data: Employee | any): Promise<Employee> => {
  const { data: updatedEmployee } = await api.put(`/employees/${id}`, data)
  return updatedEmployee
}

export const deleteEmployee = async (id: number) => {
  await api.delete(`/employees/${id}`)
}