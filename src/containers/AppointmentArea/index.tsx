import { useEffect, useState } from 'react'
import { PageHeader, Spin, Button } from 'antd'
import { useSession } from 'next-auth/client'

import List from '../../components/List'
import ListItem from '../../components/ListItem'
import AppointmentModal from './AppointmentModal'
import { deleteAppointment, getAllAppointments } from '../../services'

import MedicalIcon from '@ant-design/icons/MedicineBoxOutlined'
import AddIcon from '@ant-design/icons/PlusCircleOutlined'

const AppointmentArea: React.FC = () => {
  const [ session ] = useSession()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  const [appointments, setAppointments] = useState<Appointment[]>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllAppointments(session?.user.id!)
      .then(res => setAppointments(res))
    setLoading(false)
  }, [loading])

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
          setLoading(true)
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

      {!appointments || loading ? <Spin /> :
        <List
          count={appointments!.length}
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
          setLoading(true)
        }}
      />
    </>
  )
}

export default AppointmentArea