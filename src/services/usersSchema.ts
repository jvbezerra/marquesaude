import * as yup from 'yup'
import dynamic from 'next/dynamic'

export const UsersSchema = {
  'unit': {
    label: 'Cidadão',
    key: 'Cartão do SUS',
    placeholder: 'Insira o número do cartão do SUS',
    mask: '999 9999 9999 9999',
    dashboard: dynamic(() => import('../containers/Unit')),
    validationSchema: yup.object().shape({
      key: yup.string()
        .required('Obrigatório')
        .min(15, "Inválido"),
      password: yup.string()
        .required('Obrigatório'),
    }),
    credentialHandler: (data: any) => {
      const { type, ...unit} = data
      return {
        status: 'success', 
        unit,
        type,
      }
    },
  },
  'user': {
    label: 'Unidade',
    key: 'CNES',
    placeholder: 'Insira o número do CNES',
    mask: '9999999',
    dashboard: dynamic(() => import('../containers/Citizen')),
    validationSchema: yup.object().shape({
      key: yup.string()
        .required('Obrigatório')
        .min(7, "Inválido"),
      password: yup.string()
        .required('Obrigatório'),
    }),
    credentialHandler: (data: any) => {
      const { type, unit, ...user} = data
      return {
        status: 'success', 
        user,
        unit,
        type,
      }
    },
  },
}