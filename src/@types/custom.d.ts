declare module "*.png";

declare interface User {
  id: number,
  name: string,
  phone: string,
  address: string,
  cpf: string,
  password?: string,
  birthdate: string,
}

declare interface Appointment {
  id: number,
  name: string,
  hour: string,
  date: string,
  vacancies?: number,
}

declare interface Unit {
  id: number,
  name: string,
  cnes: string,
  phone: string,
  password?: string,
  address: {
    street: string,
    neighborhood: string,
    city: string
  }
}