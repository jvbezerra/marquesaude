import { useContext, useState } from 'react'
import { PageHeader, Spin, Button } from 'antd'

import { useFetch } from '../../hooks/useFetch'
import List from '../../components/List'
import ListItem from '../../components/ListItem'
import AppointmentModal from './AppointmentModal'
import { AuthContext } from '../../contexts/auth'

import MedicalIcon from '@ant-design/icons/MedicineBoxOutlined'
import AddIcon from '@ant-design/icons/PlusCircleOutlined'

const AppointmentArea: React.FC = () => {
  const { unit } = useContext(AuthContext)
  const { data: appointments } = useFetch<Appointment[]>(() => '/appointments/unit/'+unit?.id)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  const renderItem = ({index, style}: any) => {
    const item: Appointment = appointments![index]
    return (
      <ListItem
        avatar={<MedicalIcon/>}
        title={item.name}
        style={style}
        description={item.name}
        onView={async () => {
          setSelectedAppointment(item)
          setIsModalOpen(true)
        }}
        onDelete={() => {}}
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
          count={appointments!.length}
          showing={8}
          renderItem={renderItem}
        />
      }

      <AppointmentModal
        appointment={selectedAppointment}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

export default AppointmentArea