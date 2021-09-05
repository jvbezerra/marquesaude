import { Row, Col } from 'antd'
import { Form } from 'formik'
import { useSession } from 'next-auth/client'
import * as yup from 'yup'
import FormModal from '../../../components/FormModal'
import TextInput from '../../../components/Inputs/TextInput'

interface Props {
  unit: Unit
  isOpen: boolean
  onClose: Function
}

const validationSchema = yup.object().shape({
  name: yup.string()
    .required("Obrigatório"),
  cnes: yup.string()
    .required('Obrigatório')
    .min(7, "Inválido"),
  phonenumber: yup.string()
    .required()
    .min(14, "Inválido"),
  password: yup.string(),
  street: yup.string()
    .required("Obrigatório"),
  neighborhood: yup.string()
    .required("Obrigatório"),
  city: yup.string()
    .required("Obrigatório"),
})

const UnitModal: React.FC<Props> = (props) => {
  const { unit, isOpen, onClose } = props

  const editUser = (values: Unit) => {
    // edit unit service function
  }

  return (
    <FormModal
      title="Unidade"
      isEdit={!!unit}
      isOpen={isOpen}
      onClose={() => onClose()}
      onAdd={() => {}}
      onEdit={(values: Unit) => editUser(values)}
      validationSchema={validationSchema}
      initialValues={{
        name: unit?.name ?? '',
        cnes: unit?.cnes ?? '',
        phonenumber: unit?.phonenumber ?? '',
        passoword: unit?.password ?? '',
        street: unit?.street ?? '',
        neighborhood: unit?.neighborhood ?? '',
        city: unit?.city ?? ''
      }}
    >
      {({ values, errors, handleChange }) => (
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
                disabled
                name="cnes"
                label="CNES"
                value={values.cnes}
                mask="9999999"
                error={errors.cnes}
                onChange={handleChange}
              />
            </Col>
            <Col span={12}>
              <TextInput
                name="phonenumber"
                label="Celular"
                mask={values.phonenumber.length > 14 ? "(99) 99999-9999" : "(99) 9999-9999"}
                value={values.phonenumber}
                error={errors.phonenumber}
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