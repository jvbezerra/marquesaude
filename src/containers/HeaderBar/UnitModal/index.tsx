import { Row, Col } from 'antd'
import { Form } from 'formik'
import { useContext } from 'react'
import * as yup from 'yup'
import FormModal from '../../../components/FormModal'
import TextInput from '../../../components/Inputs/TextInput'
import { AuthContext } from '../../../contexts/auth'

interface Props {
  isOpen: boolean
  onClose: Function
}

const validationSchema = yup.object().shape({
  name: yup.string()
    .required("Obrigatório"),
  cnpj: yup.string()
    .required('Obrigatório')
    .min(18, "Inválido"),
  phone: yup.string()
    .required()
    .min(15, "Inválido"),
  password: yup.string(),
  street: yup.string()
    .required("Obrigatório"),
  neighborhood: yup.string()
  .required("Obrigatório"),
  city: yup.string()
    .required("Obrigatório"),
})

const UnitModal: React.FC<Props> = (props) => {
  const { isOpen, onClose } = props
  const { unit } = useContext(AuthContext)

  const editUser = (values: Unit) => {}

  return (
    <FormModal
      title="Usuário"
      isEdit={!!unit}
      isOpen={isOpen}
      onClose={() => onClose()}
      onAdd={() => {}}
      onEdit={(values: Unit) => editUser(values)}
      validationSchema={validationSchema}
      initialValues={{
        name: unit?.name ?? '',
        cnpj: unit?.cnpj ?? '',
        phone: unit?.phone ?? '',
        passoword: unit?.password ?? '',
        street: unit?.address?.street ?? '',
        neighborhood: unit?.address?.neighborhood ?? '',
        city: unit?.address?.neighborhood ?? ''
      }}
    >
      {({ values, errors, handleChange, setFieldValue }) => (
        <Form>
          <TextInput
            name="name"
            label="Nome"
            value={values.name}
            error={errors.name}
            onChange={handleChange}
          />
          <Row gutter={12}>
            <Col span={12}>
              <TextInput
                name="cnpj"
                label="CNPJ"
                value={values.cnpj}
                mask="99.999.999/9999-99"
                error={errors.cnpj}
                onChange={handleChange}
              />
            </Col>
            <Col span={12}>
              <TextInput
                name="phone"
                label="Celular"
                mask="(99) 99999-9999"
                value={values.phone}
                error={errors.phone}
                onChange={handleChange}
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
            name="street"
            label="Endereço"
            value={values.street}
            error={errors.street}
            onChange={handleChange}
          />
          <Row gutter={12}>
            <Col span={12}>
              <TextInput
                name="neighborhood"
                label="Bairro"
                value={values.neighborhood}
                error={errors.neighborhood}
                onChange={handleChange}
              />
            </Col>
            <Col span={12}>
              <TextInput
                name="city"
                label="Cidade"
                value={values.city}
                error={errors.city}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Form>
      )}
    </FormModal>
  )
}

export default UnitModal