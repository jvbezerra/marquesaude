import { Row, Col } from 'antd'
import { Form } from 'formik'
import moment from 'moment'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import FormModal from '../../../components/FormModal'

import DateInput from '../../../components/Inputs/DateInput'
import NumberInput from '../../../components/Inputs/NumberInput'
import TextInput from '../../../components/Inputs/TextInput'
import { createAppointment, editAppointment } from '../../../services'

interface Props {
  unitId: number
  appointment: Appointment | null
  isOpen: boolean
  onClose: Function
}

const validationSchema = yup.object().shape({
  name: yup.string()
    .required("Obrigatório"),
  date: yup.date()
    .required(),
  vacancies: yup.number()
    .required(),
})

const AppointmentModal: React.FC<Props> = (props) => {
  const { appointment, isOpen, onClose, unitId } = props

  const addAppointment = async (values: Appointment) => {
    createAppointment({
      ...values,
      unit_id: unitId
    })
      .then(res => {
        if (!res) toast.error("Algo deu errado :/")
      })
      .finally(() => onClose())
  }

  const changeAppointment = (values: Appointment | any) => {
    editAppointment(appointment?.id!, values)
      .then(res => {
        if (!res) toast.error("Algo deu errado :/")
      })
      .finally(() => onClose())
  }

  return (
    <FormModal
      title="Consulta"
      isEdit={!!appointment}
      isOpen={isOpen}
      onClose={() => onClose()}
      onAdd={(values: Appointment) => addAppointment(values)}
      onEdit={(values: Appointment) => changeAppointment(values)}
      validationSchema={validationSchema}
      initialValues={{
        name: appointment?.name ?? '',
        date: appointment?.date ?? '',
        vacancies: appointment?.vacancies ?? 0,
      }}
    >
      {({ values, errors, handleChange, setFieldValue }) => (
        <Form>
          <Row gutter={12}>
            <Col span={12}>
              <TextInput
                name="name"
                label="Nome"
                placeholder="Insira o nome/tipo"
                value={values.name}
                error={errors.name}
                onChange={handleChange}
              />
            </Col>
            <Col span={12}>
              <NumberInput
                label="Vagas"
                value={values.vacancies}
                error={errors.name}
                onChange={value => setFieldValue('vacancies', value)}
              />
            </Col>
          </Row>
          <DateInput
            label="Data da consulta"
            value={values.date ? moment(values.date) : ''}
            onChange={value => setFieldValue('date', moment(value))}
          />
        </Form>
      )}
    </FormModal>
  )
}

export default AppointmentModal