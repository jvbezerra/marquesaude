import * as yup from 'yup'

export enum UserTypes {
  Unit = 'unit',
  Citizen = 'citizen'
}

type Schema = {
  [key in UserTypes as string]: {
    label: string
    key: string
    placeholder: string
    mask: string
    validationSchema: yup.ObjectSchema<any>
  }
}

export const UsersSchema: Schema = {
  [UserTypes.Citizen]: {
    label: 'Cidadão',
    key: 'Cartão do SUS',
    placeholder: 'Insira o número do cartão do SUS',
    mask: '999 9999 9999 9999',
    validationSchema: yup.object().shape({
      key: yup.string()
        .required('Obrigatório')
        .min(15, "Inválido"),
      password: yup.string()
        .required('Obrigatório'),
    }),
  },
  [UserTypes.Unit]: {
    label: 'Unidade',
    key: 'CNES',
    placeholder: 'Insira o número do CNES',
    mask: '9999999',
    validationSchema: yup.object().shape({
      key: yup.string()
        .required('Obrigatório')
        .min(7, "Inválido"),
      password: yup.string()
        .required('Obrigatório'),
    }),
  },
}