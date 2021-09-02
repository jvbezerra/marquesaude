declare module "*.png";

declare interface User {
  id: number,
  name: string,
  phonenumber: string,
  address: string,
  cpf: string,
  password?: string,
  unit_id?: number,
  birthdate: Date,
}

declare interface Appointment {
  id: number,
  name: string,
  date: Date,
  vacancies?: number,
  unit_id?: number,
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