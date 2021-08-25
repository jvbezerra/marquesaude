import api from './api'

// @UNIT
export const unitSignIn = async (cnes: string, password: string) => {
  const { data: unit } = await api.get<Unit>('/units/signin', {
    auth: {
      username: cnes,
      password,
    }
  })
  return unit
}

export const editUnit = async (id: number, data: Unit | any) => {
  const { data: updatedUnit } = await api.put(`/units/${id}`, data)
  return updatedUnit
}

// @USER
export const createUser = async (data: User) => {
  const { data: newUser } = await api.post('/users', data)
  return newUser
}

export const editUser = async (id: number, data: User | any) => {
  const { data: updatedUser } = await api.put(`/users/${id}`, data)
  return updatedUser
}

export const userSignIn = async (cpf: string, password: string) => {
  const { data: user } = await api.get<User>('/users/signin', {
    auth: {
      username: cpf,
      password,
    }
  })
  return user
}

// @APPOINTMENTS
export const createAppointment = async (data: Appointment) => {
  const { data: newAppointment } = await api.post('/appointments', data)
  return newAppointment
}

export const editAppointment = async (id: number, data: Appointment | any) => {
  const { data: updatedAppointment } = await api.put(`/appointments/${id}`, data)
  return updatedAppointment
}