declare module "*.png";

declare interface Unit {
  id: number,
  name: string,
  cnes: string,
  password?: string,
  cep: string,
  street: string,
  neighborhood: string,
  city: string
  phonenumber: string,
}

declare interface Citizen {
  id: number,
  susCard: string,
  cpf: string,
  phonenumber: string,
  password?: string,
  name: string,
  birthdate: Date | string,
  city: string,
  street: string,
  neighborhood: string,
  unitId?: number,
  Unit?: Unit,
}

declare interface Employee {
  id: number,
  cpf: string,
  roleId?: number,
  professionalRecord?: string,
  name: string,
  available: boolean,
  unitId?: number,
  appointments?: Appointment[],
  hours?: Hour[] | any
}

declare interface EmployeeRole {
  id: number,
  name: string,
}

declare interface Appointment {
  id?: number,
  userId: number,
  employeeId: number,
  date?: string,
  hour?: string,
  status?: string,
}

declare interface Hour {
  id?: number,
  employeeId?: number,
  hour: string,
}