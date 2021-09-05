import { Row, Col } from 'antd'
import { Form } from 'formik'
import moment from 'moment'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import FormModal from '../../../components/FormModal'
import DateInput from '../../../components/Inputs/DateInput'
import TextInput from '../../../components/Inputs/TextInput'
import { createUser, editUser } from '../../../services'

interface Props {
  unitId: number
  user: User | null
  isOpen: boolean
  onClose: Function
}


const validationSchema = yup.object().shape({
  name: yup.string()
    .required("Obrigatório"),
  cpf: yup.string()
    .required('Obrigatório')
    .min(14, "Inválido"),
  phonenumber: yup.string()
    .required()
    .min(15, "Inválido"),
  birthdate: yup.date()
    .required()
    .min(10, "Inválido"),
  password: yup.string(),
  address: yup.string()
    .required("Obrigatório"),
})

const UserModal: React.FC<Props> = (props) => {
  const { user, isOpen, onClose, unitId } = props

  const addUser = async (values: User) => {
    const { phonenumber, cpf } = values
    
    createUser({
      ...values,
      phonenumber: phonenumber.replace(/[^0-9]/g, ""),
      cpf: cpf.replace(/[^0-9]/g, ""),
      unit_id: unitId
    })
      .then(res => {
        if (!res) toast.error("Algo deu errado :/")
      })
      .finally(() => onClose())
  }

  const changeUser = async (values: User | any) => {
    editUser(user?.id!, values)
      .then(res => {
        if (!res) toast.error("Algo deu errado :/")
      })
      .finally(() => onClose())
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
        phonenumber: user?.phonenumber ?? '',
        birthdate: user?.birthdate ?? '',
        password: user?.password ?? '',
        address: user?.address ?? ''
      }}
    >
      {({ values, errors, handleChange, setFieldValue }) => (
        <Form>
          <TextInput
            name="name"
            label="Nome"
            placeholder="Insira o nome completo"
            value={values.name}
            error={errors.name}
            onChange={handleChange}
          />
          <TextInput
            name="cpf"
            label="CPF"
            value={values.cpf}
            mask="999.999.999-99"
            placeholder="123.456.789-10"
            error={errors.cpf}
            onChange={handleChange}
          />
          <Row gutter={12}>
            <Col span={12}>
              <TextInput
                name="phonenumber"
                label="Celular"
                mask="(99) 99999-9999"
                placeholder="(99) 9999-9999"
                value={values.phonenumber}
                error={errors.phonenumber}
                onChange={handleChange}
              />
            </Col>
            <Col span={12}>
            <DateInput
                label="Data de nascimento"
                value={values.birthdate ? moment(values.birthdate) : ''}
                onChange={value => setFieldValue('birthdate', moment(value))}
              />
            </Col>
          </Row>
          <TextInput
            label="Alterar senha"
            type="password"
            name="password"
            placeholder="Insira a senha para mudança"
            value={values.password}
            error={errors.password}
            onChange={handleChange}
          />
          <TextInput
            label="Endereço"
            name="address"
            placeholder="Rua dos Bobos, 10"
            value={values.address}
            error={errors.address}
            onChange={handleChange}
          />
        </Form>
      )}
    </FormModal>
  )
}

export default UserModal