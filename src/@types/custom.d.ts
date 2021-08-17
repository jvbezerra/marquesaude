declare module "*.png";

declare interface User {
  id?: number,
  name: string,
  phonenumber: string,
  address: string,
  cpf: string,
  password?: string,
  birthdate: Date,
}

declare interface Appointment {
  id: number,
  name: string,
  timetable: Date,
  date: Date,
  vacancies?: number,
}

declare interface Unit {
  id: number,
  name: string,
  cnes: string,
  phonenumber: string,
  password?: string,
  cep: string,
  street: string,
  neighborhood: string,
  city: string
}