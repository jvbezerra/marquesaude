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
export const editUnit = async (id: number, data: Unit | any) => {
  const { data: updatedUnit } = await api.put(`/units/${id}`, data)
  return updatedUnit
}

// USER
export const createUser = async (data: User) => {
  const { data: newUser } = await api.post('/users', data)
  return newUser
}

export const editUser = async (id: number, data: User | any) => {
  const { data: updatedUser } = await api.put(`/users/${id}`, data)
  return updatedUser
}

export const deleteUser = async (id: number) => {
  await api.delete(`/users/${id}`)
}

export const getAllUsers = async (unitId: number) => {
  const { data: users } = await api.get(`/users/unit/${unitId}`)
  return users
}

// APPOINTMENTS
export const createAppointment = async (data: Appointment) => {
  const { data: newAppointment } = await api.post('/appointments', data)
  return newAppointment
}

export const editAppointment = async (id: number, data: Appointment | any) => {
  const { data: updatedAppointment } = await api.put(`/appointments/${id}`, data)
  return updatedAppointment
}

export const deleteAppointment = async (id: number) => {
  await api.delete(`/appointments/${id}`)
}

export const getAllAppointments = async (unitId: number) => {
  const { data: appointments } = await api.get(`/appointments/unit/${unitId}`)
  return appointments
}