import Grid from '@mui/material/Grid'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import dayjs from 'dayjs'

import FormModal from '../../../components/FormModal'
import DateInput from '../../../components/Inputs/DateInput'
import TextInput from '../../../components/Inputs/TextInput'
import { createUser, editUser } from '../../../services'

interface Props {
  unitId: number
  user: User | null
  isOpen: boolean
  onClose: Function
  mutate: any
}


const validationSchema = yup.object().shape({
  name: yup.string()
    .required("Obrigatório"),
  susCard: yup.string()
    .required("Obrigatório")
    .min(15, "Inválido"),
  cpf: yup.string()
    .min(14, "Inválido"),
  phonenumber: yup.string()
    .required()
    .min(15, "Inválido"),
  birthdate: yup.date()
    .required()
    .min(10, "Inválido"),
  password: yup.string(),
  street: yup.string()
    .required("Obrigatório"),
  neighborhood: yup.string()
    .required("Obrigatório"),
  city: yup.string()
    .required("Obrigatório"),
})

const UserModal: React.FC<Props> = (props) => {
  const { user, isOpen, onClose, unitId, mutate } = props

  const addUser = async (values: User) => {
    const { phonenumber, cpf, susCard } = values
     console.log('test')
    createUser({
      ...values,
      unitId,
      phonenumber: phonenumber.replace(/[^0-9]/g, ""),
      cpf: cpf?.replace(/[^0-9]/g, ""),
      susCard: susCard.replace(/( )+/g, ""),
    })
      .then(res => {
        if (!res) toast.error("Algo deu errado :/")
      })
      .finally(() => {
        mutate()
        onClose()
      })
  }

  const changeUser = async (values: User | any) => {
    editUser(user?.id!, values)
      .then(res => {
        if (!res) toast.error("Algo deu errado :/")
      })
      .finally(() => {
        mutate()
        onClose()
      })
  }

  return (
    <FormModal
      title="Usuário"
      isEdit={!!user}
      isOpen={isOpen}
      onClose={() => onClose()}
      onAdd={(values: User) => addUser(values)}
      onEdit={(values: User) => changeUser(values)}
      validationSchema={validationSchema}
      initialValues={{
        name: user?.name ?? '',
        cpf: user?.cpf ?? '',
        susCard: user?.susCard ?? '',
        phonenumber: user?.phonenumber ?? '',
        birthdate: user?.birthdate ?? '',
        password: user?.password ?? '',
        street: user?.street ?? '',
        city: user?.city ?? '',
        neighborhood: user?.neighborhood ?? '',
      }}
    >
       {({ setValue, formState: { errors }, watch }) => {
        const values = watch()
        return (
          <>
            <TextInput
              label="Nome"
              placeholder="Insira o nome completo"
              value={values?.name}
              error={errors.name?.message}
              onChange={({ target }) => setValue('name', target.value)}
            />
            <TextInput
              label="Cartão do SUS"
              mask="999 9999 9999 9999"
              placeholder="999 9999 9999 9999"
              value={values?.susCard}
              error={errors.susCard?.message}
              onChange={({ target }) => setValue('susCard', target.value)}
            />
            <TextInput
              label="CPF"
              mask="999.999.999-99"
              placeholder="123.456.789-10"
              value={values?.cpf}
              error={errors.cpf?.message}
              onChange={({ target }) => setValue('cpf', target.value)}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextInput
                  label="Celular"
                  mask="(99) 99999-9999"
                  placeholder="(99) 9999-9999"
                  value={values?.phonenumber}
                  error={errors.phonenumber?.message}
                  onChange={({ target }) => setValue('phonenumber', target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <DateInput
                  label="Data de nascimento"
                  value={values?.birthdate ? dayjs(values?.birthdate) : ''}
                  onChange={value => setValue('birthdate', value)}
                />
              </Grid>
            </Grid>
            <TextInput
              value={values?.street}
              label="Endereço"
              placeholder="Rua dos Bobos, 0"
              error={errors.street?.message}
              onChange={({ target }) => setValue('street', target.value)}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextInput
                  value={values?.neighborhood}
                  label="Bairro"
                  placeholder="Bairro do Esmero"
                  error={errors.neighborhood?.message}
                  onChange={({ target }) => setValue('neighborhood', target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextInput
                  value={values?.city}
                  label="Cidade"
                  placeholder="Santa Rita"
                  error={errors.neighborhood?.message}
                  onChange={({ target }) => setValue('city', target.value)}
                />
              </Grid>
            </Grid>
            <TextInput
              value={values?.password}
              label="Alterar senha"
              type="password"
              placeholder="Insira a senha para mudança"
              error={errors.password?.message}
              onChange={({ target }) => setValue('password', target.value)}
            />
          </>
        )
      }}
    </FormModal>
  )
}

export default UserModal