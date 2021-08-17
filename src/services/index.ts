import api from './api'

// @UNIT
export const signIn = async (cnes: string, password: string) => {
  const { data: unit } = await api.get<Unit>('/units/signin', {
    auth: {
      username: cnes,
      password,
    }
  })
  return unit
}

export const editUnit = async (id: number, data: Unit | any) => {
  const { data: updatedUnit } = await api.put(`/units/put/${id}`, data)
  return updatedUnit
}

// @USER
export const createUser = async (data: User) => {
  const { data: newUser } = await api.post('/users', data)
  return newUser
}

export const editUser = async (id: number, data: User | any) => {
  const { data: updatedUser } = await api.put(`/users/put/${id}`, data)
  return updatedUser
}

// @APPOINTMENTS
export const createAppointment = async (data: Appointment) => {
  const { data: newUser } = await api.post('/appointments', data)
  return newUser
}

export const editAppointment = async (id: number, data: Appointment | any) => {
  const { data: updatedAppointment } = await api.put(`/appointments/put/${id}`, data)
  return updatedAppointment
}