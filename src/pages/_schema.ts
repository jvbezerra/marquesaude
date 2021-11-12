import * as yup from 'yup'

export const userTypes = [
  {
    label: 'Cidadão',
    type: 'citizen',
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
  {
    label: 'Unidade',
    type: 'unit',
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
]