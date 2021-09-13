import { Row, Col } from 'antd'
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
  mutate: any
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
  const { appointment, isOpen, onClose, unitId, mutate } = props

  const addAppointment = async (values: Appointment) => {
    createAppointment({
      ...values,
      unit_id: unitId
    })
      .then(res => {
        if (!res) toast.error("Algo deu errado :/")
      })
      .finally(() => {
        mutate()
        onClose()
      })
  }

  const changeAppointment = (values: Appointment | any) => {
    editAppointment(appointment?.id!, values)
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
      {({ setValue, formState: { errors }, watch }) => {
        const values = watch()
        return (
          <>
            <Row gutter={12}>
              <Col span={12}>
                <TextInput
                  label="Nome"
                  placeholder="Insira o nome/tipo"
                  error={errors.name?.message}
                  value={values?.name}
                  onChange={({ target }) => setValue('name', target.value)}
                />
              </Col>
              <Col span={12}>
                <NumberInput
                  label="Vagas"
                  error={errors.vacancies?.message}
                  value={values?.vacancies}
                  onChange={value => setValue('vacancies', value)}
                />
              </Col>
            </Row>
            <DateInput
              label="Data da consulta"
              value={values.date ? moment(values.date) : ''}
              onChange={value => setValue('date', value)}
            />
          </>
        )
      }}
    </FormModal>
  )
}

export default AppointmentModal