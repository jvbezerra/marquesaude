import { Row, Col } from 'antd'
import { Form } from 'formik'
import moment from 'moment'
import * as yup from 'yup'
import FormModal from '../../../components/FormModal'

import DateInput from '../../../components/Inputs/DateInput'
import NumberInput from '../../../components/Inputs/NumberInput'
import TextInput from '../../../components/Inputs/TextInput'
import TimeInput from '../../../components/Inputs/TimeInput'
import { createAppointment } from '../../../services'

interface Props {
  appointment: Appointment | null
  isOpen: boolean
  onClose: Function
}

const validationSchema = yup.object().shape({
  name: yup.string()
    .required("Obrigatório"),
  timetable: yup.date()
    .required()
    .min(5, "Inválido"),
  date: yup.date()
    .required()
    .min(10, "Inválido"),
  vacancies: yup.number()
    .required(),
})

const AppointmentModal: React.FC<Props> = (props) => {
  const { appointment, isOpen, onClose } = props

  const addAppointment = async (values: Appointment) => {
    await createAppointment(values)
    onClose()
  }

  const editAppointment = (values: Appointment) => {
    // edit appointment service function
  }

  return (
    <FormModal
      title="Consulta"
      isEdit={!!appointment}
      isOpen={isOpen}
      onClose={() => onClose()}
      onAdd={(values: Appointment) => addAppointment(values)}
      onEdit={(values: Appointment) => editAppointment(values)}
      validationSchema={validationSchema}
      initialValues={{
        name: appointment?.name ?? '',
        hour: appointment?.timetable ?? '',
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
          <Row gutter={12}>
            <Col span={12}>
              <DateInput
                label="Data da consulta"
                value={values.date ? moment(values.date) : ''}
                onChange={value => setFieldValue('date', moment(value))}
              />
            </Col>
            <Col span={12}>
              <TimeInput
                label="Hora da consulta"
                value={values.hour ? moment(values.hour, 'HH:mm') : ''}
                format="HH:mm"
                onChange={value => setFieldValue('hour', moment(value))}
              />
            </Col>
          </Row>
        </Form>
      )}
    </FormModal>
  )
}

export default AppointmentModal