import { Row, Col } from 'antd'
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
      {({ setValue, formState: { errors }, watch }) => {
        const values = watch()
        return (
          <>
            <TextInput
              label="Nome"
              error={errors.name?.message}
              value={values?.name}
              onChange={({ target }) => setValue('name', target.value)}
            />
            <Row gutter={12}>
              <Col span={12}>
                <TextInput
                  label="CNES"
                  disabled
                  mask="9999999"
                  error={errors.cnes?.message}
                  value={values?.cnes}
                  onChange={({ target }) => setValue('cnes', target.value)}
                />
              </Col>
              <Col span={12}>
                <TextInput
                  label="Celular"
                  mask={values.phonenumber.length > 14 ? "(99) 99999-9999" : "(99) 9999-9999"}
                  error={errors.phonenumber?.message}
                  onChange={({ target }) => setValue('phonenumber', target.value)}
                />
              </Col>
            </Row>
            <TextInput
              label="Alterar senha"
              type="password"
              placeholder="Insira a senha para mudança"
              error={errors.password?.message}
              onChange={({ target }) => setValue('password', target.value)}
            />
            <TextInput
              label="Endereço"
              error={errors.street?.message}
              value={values?.street}
              onChange={({ target }) => setValue('street', target.value)}
            />
            <Row gutter={12}>
              <Col span={12}>
                <TextInput
                  label="Bairro"
                  error={errors.neighborhood?.message}
                  value={values?.neighborhood}
                  onChange={({ target }) => setValue('neighborhood', target.value)}
                />
              </Col>
              <Col span={12}>
                <TextInput
                  label="Cidade"
                  error={errors.city?.message}
                  value={values?.city}
                  onChange={({ target }) => setValue('city', target.value)}
                />
              </Col>
            </Row>
          </>
        )
      }}
    </FormModal>
  )
}

export default UnitModal