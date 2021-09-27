import Icon from '@mui/material/Icon'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'
import { createAppointment } from '../../services'

interface ButtonProps {
  employeeId: number
  userId: number
  mutate?: any
  scheduledHour?: string
}

type AppointmentOption = { [key: string]: (props: ButtonProps) => JSX.Element }

export const appointmentSchema: AppointmentOption = {
  "available": ({ employeeId, userId, mutate }) => (
    <IconButton
      aria-label="Solicitar"
      onClick={async () => {
        await createAppointment({
          employeeId,
          userId,
          status: 'requested',
          date: dayjs().format('YYYY-MM-DD')
        })

        mutate()
      }}
    >
      <Icon>event</Icon>
      <Typography style={{ marginLeft: 10 }}>Solicitar agendamento</Typography>
    </IconButton>
  ),
  "requested": () => (
    <IconButton color="info" aria-label="Visualizar">
      <Icon>schedule</Icon>
      <Typography style={{ marginLeft: 10 }}>Aguardando horário</Typography>
    </IconButton>
  ),
  "defined": (props) => (
    <IconButton color="success" aria-label="Visualizar">
      <Icon>task_alt</Icon>
      <Typography style={{ marginLeft: 10 }}>
        Marcado às {dayjs(props.scheduledHour).format('HH:mm')}
      </Typography>
    </IconButton>
  ),
}