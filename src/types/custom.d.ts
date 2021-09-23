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

declare interface User {
  id: number,
  susCard: string,
  cpf?: string,
  phonenumber: string,
  password?: string,
  name: string,
  birthdate: Date | string,
  city: string,
  street: string,
  neighborhood: string,
  unitId?: number,
}

declare interface Employee {
  id: number,
  cpf: string,
  role: string,
  professional_record?: string,
  vacancies: number,
  name: string,
  available: boolean,
  unitId?: number,
  appointments?: Appointment[]
}

declare interface Appointment {
  id: number,
  userId: number,
  employeeId: number,
  date?: Date | string,
  hour?: Date | string,
  status?: string,
}