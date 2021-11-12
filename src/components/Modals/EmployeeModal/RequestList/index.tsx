import { Divider, Icon, IconButton, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'

import TimeInput from '../../../Inputs/TimeInput'
import List from '../../../List'
import ListItem from '../../../ListItem'
import { AppointmentService } from '../../../../services'

interface ListProps {
  appointments: Appointment[]
}

interface ItemProps {
  appointment: Appointment
}

const RequestItem: React.FC<ItemProps> = ({ appointment }) => {
  const [scheduledHour, setScheduledHour] = useState<string | undefined>()

  useEffect(() => {
    setScheduledHour(dayjs(appointment.hour).toString())
  }, [appointment.hour])

  return (
    <div style={{ marginTop: 20 }}>
      <ListItem
        title={`Consulta N°${appointment.id}`}
        actions={[
          <TimeInput
            label="Marcar horário"
            value={scheduledHour}
            onChange={(newValue: any) => {
              setScheduledHour(newValue)
            }}
            onAccept={async () => {
              await AppointmentService.edit(appointment.id!, {
                ...appointment,
                hour: scheduledHour,
                status: 'defined'
              })
            }}
          />
        ]}
      />
    </div>
  )
}

const RequestList: React.FC<ListProps> = ({ appointments }) => {
  return (
    <List
      count={appointments.length}
      showing={4}
      renderItem={({ index, style }: any) => {
        const item: Appointment = appointments[index]
        return <RequestItem appointment={item}/>
      }}
    />
  )
}

export default RequestList