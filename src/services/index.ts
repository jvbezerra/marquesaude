import api from './api'

export const signIn = async (cnes: string, password: string) => {
  const { data: unit } = await api.post<Unit>('/units/signin', {}, {
    auth: {
      username: cnes,
      password,
    }
  })

  return unit
}