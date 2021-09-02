import { useState } from 'react'
import { PageHeader, Spin, Button } from 'antd'
import { useSession } from 'next-auth/client'
import useSWR from 'swr'

import List from '../../components/List'
import ListItem from '../../components/ListItem'
import AppointmentModal from './AppointmentModal'
import { deleteAppointment } from '../../services'

import MedicalIcon from '@ant-design/icons/MedicineBoxOutlined'
import AddIcon from '@ant-design/icons/PlusCircleOutlined'

const AppointmentArea: React.FC = () => {
  const [ session ] = useSession()
  const { data: appointments, mutate } = useSWR(`/appointments/unit/${session?.user.id!}`)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  const renderItem = ({ index, style }: any) => {
    const item: Appointment = appointments![index]
    return (
      <ListItem
        avatar={<MedicalIcon/>}
        title={item.name}
        style={style}
        description={item.name}
        onDelete={async () => {
          await deleteAppointment(item.id)
          mutate()
        }}
        onView={async () => {
          setSelectedAppointment(item)
          setIsModalOpen(true)
        }}
      />
    )
  }

  return (
    <>
      <PageHeader
        title="Consultas"
        extra={[
          <Button
            key="add"
            aria-label="Adicionar"
            shape="circle"
            icon={<AddIcon/>}
            onClick={async () => {
              setSelectedAppointment(null)
              setIsModalOpen(true)
            }}
          />
        ]}
      />

      {!appointments ? <Spin /> :
        <List
          count={appointments.length}
          showing={8}
          renderItem={renderItem}
        />
      }

      <AppointmentModal
        unitId={session?.user.id!}
        appointment={selectedAppointment}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          mutate()
        }}
      />
    </>
  )
}

export default AppointmentArea