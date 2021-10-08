import api, { GeneralService } from './api'

const setAuthToken = (token: string) => {
  api.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export const authenticate = async (key: string, password: string) => {
  const { data } = await api.get('/auth/signin', {
    auth: {
      username: key,
      password,
    }
  })
  
  setAuthToken(data.token)
  return data
}

export const UserService = GeneralService<Citizen>('users')

export const EmployeeService = GeneralService<Employee>('employees')

export const AppointmentService = GeneralService<Appointment>('appointments')

export const UnitService = GeneralService<Unit>('units')