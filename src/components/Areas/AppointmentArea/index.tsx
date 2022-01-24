import { useState } from 'react'
import Icon from '@mui/material/Icon'
import IconButton from '@mui/material/IconButton'
import { useSession } from 'next-auth/client'
import dynamic from 'next/dynamic'
import dayjs from 'dayjs'
import useSWR from 'swr'

import { Virtuoso as List } from 'react-virtuoso'
import ListItem from '../../ListItem'
import Header from '../../PageHeader'
import Loading from '../../Loading'
import useAPI from '../../../hooks/useAPI'
const AppointmentModal = dynamic(() => import('./AppointmentModal'), { ssr: false })

const AppointmentArea: React.FC<{ appointments: Appointment[] }> = ({ appointments: fallbackData }) => {
  const [ session ] = useSession()
  const { data: appointments, mutate } = useSWR<Appointment[]>(`/appointments?id=${session?.unit?.id}`, { fallbackData })
  const AppointmentService = useAPI<Appointment>('appointments')

  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  const AppointmentItem: React.FC<{ item: Appointment }> = ({ item }) => (
    <ListItem
      title={`${item.user?.name} com ${item.employee?.name}`}
      description={`Marcado para ${dayjs(item.date).format('DD/MM/YYYY às HH:mm')}`}
      actions={[
        <IconButton
          key="view"
          aria-label="Visualizar"
          onClick={async () => {
            setSelectedAppointment(item)
            setIsAppointmentModalOpen(true)
          }}
        >
          <Icon>visibility</Icon>
        </IconButton>,
        <IconButton
          key="delete"
          aria-label="Apagar"
          onClick={async () => {
            await AppointmentService.exclude(item.id!)
            mutate()
          }}
        >
          <Icon>delete_outline</Icon>
        </IconButton>,
      ]}
    />
  )

  return (
    <>
      {!appointments ? <Loading /> :
        <List
          data={appointments}
          itemContent={(_, appointment) => <AppointmentItem item={appointment}/>}
          components={{
            Header: () => (
              <Header
                title="Agendamentos"
                actions={[
                  <IconButton
                    key="add"
                    aria-label="Adicionar"
                    onClick={async () => {
                      setSelectedAppointment(null)
                      setIsAppointmentModalOpen(true)
                    }}
                  >
                    <Icon>add_circle_outline</Icon>
                  </IconButton>,
                ]}
              />
            )
          }}
        />
      }

      {isAppointmentModalOpen &&
        <AppointmentModal
          appointment={selectedAppointment}
          isOpen={isAppointmentModalOpen}
          onClose={() => setIsAppointmentModalOpen(false)}
          mutate={mutate}
        />
      }
    </>
  )
}

export default AppointmentArea