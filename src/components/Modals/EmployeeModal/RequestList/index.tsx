import dayjs from 'dayjs'
import { useState, useEffect } from 'react'

import TimeInput from '../../../Inputs/TimeInput'
import { Virtuoso as List } from 'react-virtuoso'
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
            key={scheduledHour}
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
      data={appointments}
      itemContent={(_, appointment) => <RequestItem appointment={appointment}/>}
    />
  )
}

export default RequestList