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
export const createUser = async (data: Citizen): Promise<Citizen> => {
  const { data: newUser } = await api.post('/users', data)
  return newUser
}

export const editUser = async (id: number, data: Citizen | any): Promise<Citizen> => {
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

// APPOINTMENTS
export const createAppointment = async (data: Appointment | any): Promise<Appointment> => {
  const { data: newAppointment } = await api.post('/appointments', data)
  return newAppointment
}

export const editAppointment = async (id: number, data: Appointment | any): Promise<Appointment> => {
  const { data: updatedAppointment} = await api.put(`/appointments/${id}`, data)
  return updatedAppointment
}

export const deleteAppointment = async (id: number) => {
  await api.delete(`/appointments/${id}`)
}