import useSWR, { KeyedMutator } from 'swr'
import { useSession } from 'next-auth/client'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import Grid from '@mui/material/Grid'
import SelectItem from '@mui/material/MenuItem'

import FormModal from '../../common/FormModal'
import TextInput from '../../common/Input'
import SelectInput from '../../common/Select'
import useAPI from '../../../../hooks/useAPI'

interface Props {
  appointment: Appointment | null
  isOpen: boolean
  onClose: Function
  mutate: KeyedMutator<Appointment[]>
}

dayjs.extend(customParseFormat)

const AppointmentModal: React.FC<Props> = ({ appointment, mutate, isOpen, onClose }) => {
  const [ session ] = useSession()

  const { data: employees } = useSWR<Employee[]>(`/employees?id=${session?.unit?.id}`)
  const { data: users } = useSWR<Citizen[]>(`/users?id=${session?.unit?.id}`)
  const AppointmentService = useAPI<Appointment>('appointments')

  const addAppointment = async (values: any) => {
    const { date, hour, ...data } = values
    mutate(async (appointments: Appointment[] = []) => {
      const newAppointment = await AppointmentService.create({
        ...data,
        date: dayjs(`${dayjs(date).format('DD/MM/YYYY')} ${hour}`, 'DD/MM/YYYY HH:mm').toISOString()
      })

      return [...appointments, newAppointment]
    }).then(() => onClose())
  }

  const updateAppointment = async (values: any) => {
    const { date, hour, ...data } = values
    mutate(async (appointments: Appointment[] = []) => {
      const updatedAppointment = await AppointmentService.edit(appointment?.id!, {
        ...data,
        date: dayjs(`${dayjs(date).format('DD/MM/YYYY')} ${hour}`, 'DD/MM/YYYY HH:mm').toISOString()
      })

      const filteredAppointments = appointments.filter(item => item.id !== appointment?.id!)
      return [...filteredAppointments, updatedAppointment]
    }).then(() => onClose())
  }

  return (
    <FormModal
      title="Agendamento"
      isOpen={isOpen}
      onClose={onClose}
      onAdd={(values: Appointment) => addAppointment(values)}
      onEdit={(values: Appointment) => updateAppointment(values)}
      defaultValues={appointment}
    >
      {({ control, watch }) => (
        <>
          <SelectInput
            label="Cidadão"
            name="userId"
            control={control}
          >
            {users?.map(user => (
              <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
            ))}
          </SelectInput>
          <SelectInput
            label="Profissional"
            name="employeeId"
            control={control}
          >
            {employees?.map(employee => (
              <SelectItem key={employee.id} value={employee.id}>{employee.name}</SelectItem>
            ))}
          </SelectInput>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextInput
                label="Data"
                name="date"
                mask="99/99/9999"
                control={control}
              />
            </Grid>
            <Grid item xs={6}>
              <SelectInput
                label="Hora"
                name="hour"
                control={control}
              >
                {employees?.find(item => item.id == watch('employeeId'))?.hours.map((hour: Hour) => (
                  <SelectItem key={hour.id} value={hour.hour}>{hour.hour}</SelectItem>
                ))}
              </SelectInput>
            </Grid>
          </Grid>
        </>
      )}
    </FormModal>
  )
}

export default AppointmentModal