import useSWR from 'swr'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Virtuoso as List } from 'react-virtuoso'

import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'

import EmployeeCard from '../../Unit/EmployeeArea/EmployeeCard'
import Loading from '../../../components/Loading'
import { AppointmentService } from '../../../services'

interface Props {
  unitId: number,
  userId: number
}

const SchedulingArea: React.FC<Props> = ({ unitId, userId }) => {
  dayjs.extend(isToday)
  dayjs.extend(customParseFormat)

  const { data: employees } = useSWR<Employee[]>(`/employees/unit/${unitId}`)
  const { data, mutate } = useSWR<{ appointments: Appointment[] }>(`/users/one/${userId}/bookings`)

  const scheduleAppointment = async (hour: string, employeeId: number) => {
    await AppointmentService.create({
      employeeId,
      userId,
      date: dayjs(`${dayjs().format('DD/MM/YYYY')} ${hour}`, 'DD/MM/YYYY HH:mm').toISOString()
    })
  
    mutate()
  }

  const cancelAppointment = async (appointmentId: number) => {
    await AppointmentService.exclude(appointmentId)
    mutate()
  }

  return (
    <>
      {!employees || !data ? <Loading /> :
        <List
          data={employees}
          style={{ width: '90%' }}
          itemContent={(_, employee) => {
            let scheduled: Appointment | undefined
            if (data?.appointments?.length > 0) {
              scheduled = data?.appointments?.find(appointment => {
                return dayjs(appointment.date).isToday() && appointment.employeeId === employee.id
              })
            }

            return (
              <EmployeeCard employee={employee} key={employee.id}>
                <CardActions>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="subtitle2">Horários hoje:</Typography>
                    {scheduled && (
                      <Chip
                        label={`Marcado hoje às ${dayjs(scheduled?.date).format('HH:mm')}`}
                        color="primary"
                        onDelete={() => cancelAppointment(scheduled?.id!)}
                      />
                    )}
                    {!scheduled && employee.hours.map((item: Hour) => (
                      <Chip
                        key={item.id}
                        label={item.hour}
                        clickable
                        onClick={() => scheduleAppointment(item.hour, employee.id)}
                        color="primary"
                        variant="outlined" 
                      />
                    ))}
                  </Stack>
                </CardActions>
              </EmployeeCard>
            )
          }}
        />
      }
    </>
  )
}

export default SchedulingArea