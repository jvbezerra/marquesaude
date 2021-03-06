import Grid from '@mui/material/Grid'
import * as yup from 'yup'
import { KeyedMutator } from 'swr'
import { useSession } from 'next-auth/client'

import FormModal from '../../common/FormModal'
import TextInput from '../../common/Input'
import useAPI from '../../../../hooks/useAPI'

interface Props {
  user: Citizen | null
  isOpen: boolean
  onClose: Function
  mutate?: KeyedMutator<Citizen[]>
}

const validationSchema = yup.object().shape({
  name: yup.string()
    .required("Obrigatório"),
  susCard: yup.string()
    .required("Obrigatório")
    .min(15, "Inválido"),
  cpf: yup.string()
    .required()
    .min(11, "Inválido"),
  phonenumber: yup.string()
    .required()
    .min(11, "Inválido"),
  birthdate: yup.date()
    .required(),
  password: yup.string(),
  street: yup.string()
    .required("Obrigatório"),
  neighborhood: yup.string()
    .required("Obrigatório"),
  city: yup.string()
    .required("Obrigatório"),
})

const UserModal: React.FC<Props> = ({ user, mutate, isOpen, onClose }) => {
  const [ session ] = useSession()
  const UserService = useAPI<Citizen>('users')

  const addUser = async (values: Citizen) => {
    const { phonenumber, cpf, susCard, ...data } = values
    mutate!(async (users: Citizen[] = []) => {
      const newUser = await UserService.create({
        ...data,
        unitId: session!.unit!.id,
        phonenumber: phonenumber.replace(/[^0-9]/g, ""),
        cpf: cpf.replace(/[^0-9]/g, ""),
        susCard: susCard.replace(/( )+/g, ""),
      })
    
      return [...users, newUser]
    }).then(() => onClose())
  }

  const updateUser = async (values: Partial<Citizen>) => {
    mutate!(async (users: Citizen[] = []) => {
      const updatedUser = await UserService.edit(user?.id!, values)

      const filteredUsers = users.filter(item => item.id !== user?.id!)
      return [...filteredUsers, updatedUser]
    }).then(() => onClose())
  }

  return (
    <FormModal
      title="Usuário"
      isOpen={isOpen}
      onClose={onClose}
      onAdd={(values: Citizen) => addUser(values)}
      onEdit={(values: Citizen) => updateUser(values)}
      validationSchema={validationSchema}
      defaultValues={user}
    >
      {({ formState: { errors }, control }) => (
        <>
          <TextInput
            label="Nome"
            name="name"
            control={control}
            placeholder="Insira o nome completo"
            error={errors.name?.message}
          />
          <TextInput
            label="Cartão do SUS"
            name="susCard"
            control={control}
            mask="999 9999 9999 9999"
            placeholder="999 9999 9999 9999"
            error={errors.susCard?.message}
          />
          <TextInput
            label="CPF"
            name="cpf"
            control={control}
            mask="999.999.999-99"
            placeholder="123.456.789-10"
            error={errors.cpf?.message}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextInput
                label="Celular"
                name="phonenumber"
                control={control}
                mask="(99) 99999-9999"
                placeholder="(99) 9999-9999"
                error={errors.phonenumber?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                label="Data de nascimento"
                name="birthdate"
                control={control}
                mask="99/99/9999"
                placeholder="12/12/2012"
                error={errors.birthdate?.message}
              />
            </Grid>
          </Grid>
          <TextInput
            label="Endereço"
            name="street"
            control={control}
            placeholder="Rua dos Bobos, 0"
            error={errors.street?.message}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextInput
                label="Bairro"
                name="neighborhood"
                control={control}
                placeholder="Bairro do Esmero"
                error={errors.neighborhood?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                label="Cidade"
                name="city"
                control={control}
                placeholder="Santa Rita"
                error={errors.city?.message}
              />
            </Grid>
          </Grid>
          <TextInput
            label="Alterar senha"
            name="password"
            control={control}
            type="password"
            placeholder="Insira a senha para mudança"
            error={errors.password?.message}
          />
        </>
      )}
    </FormModal>
  )
}

export default UserModal