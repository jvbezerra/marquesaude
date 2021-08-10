import { Row, Col } from 'antd'
import { Form } from 'formik'
import moment from 'moment'
import * as yup from 'yup'
import FormModal from '../../../components/FormModal'
import DateInput from '../../../components/Inputs/DateInput'
import TextInput from '../../../components/Inputs/TextInput'

interface Props {
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
  phone: yup.string()
    .required()
    .min(15, "Inválido"),
  birthdate: yup.string()
    .required()
    .min(10, "Inválido"),
  password: yup.string(),
  address: yup.string()
    .required("Obrigatório"),
})

const UserModal: React.FC<Props> = (props) => {
  const { user, isOpen, onClose } = props

  const addUser = (values: User) => {
    // add user service function
  }

  const editUser = (values: User) => {
    // edit user service function
  }

  return (
    <FormModal
      title="Usuário"
      isEdit={!!user}
      isOpen={isOpen}
      onClose={() => onClose()}
      onAdd={(values: User) => addUser(values)}
      onEdit={(values: User) => editUser(values)}
      validationSchema={validationSchema}
      initialValues={{
        name: user?.name ?? '',
        cpf: user?.cpf ?? '',
        phone: user?.phone ?? '',
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
                name="phone"
                label="Celular"
                mask="(99) 99999-9999"
                placeholder="(99) 9999-9999"
                value={values.phone}
                error={errors.phone}
                onChange={handleChange}
              />
            </Col>
            <Col span={12}>
            <DateInput
                label="Data de nascimento"
                value={values.birthdate ? moment(values.birthdate) : ''}
                onChange={value => setFieldValue('date', moment(value).format('DD/MM/YYYY'))}
              />
            </Col>
          </Row>
          <TextInput
            label="Senha"
            type="password"
            name="password"
            placeholder="Insira a senha para acesso"
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