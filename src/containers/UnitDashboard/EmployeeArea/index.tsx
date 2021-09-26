import { useState } from 'react'
import Icon from '@mui/material/Icon'
import IconButton from '@mui/material/IconButton'
import Spin from '@mui/material/CircularProgress'
import { useSession } from 'next-auth/client'
import useSWR from 'swr'
import dynamic from 'next/dynamic'

import List from '../../../components/List'
import Header from '../../../components/PageHeader'
const EmployeeModal = dynamic(() => import('./EmployeeModal'), { ssr: false })
import { deleteEmployee, editEmployee } from '../../../services'
import EmployeeCard from './EmployeeCard'

const EmployeeArea: React.FC = () => {
  const [ session ] = useSession()
  const { data: employees, mutate } = useSWR(`/employees/unit/${session!.unit!.id}`)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  const renderItem = ({ index, style }: any) => {
    const item: Employee = employees![index]
    return (
      <EmployeeCard
        employee={item}
        onView={async () => {
          setSelectedEmployee(item)
          setIsModalOpen(true)
        }}
        onDelete={async () => {
          await deleteEmployee(item.id)
          mutate()
        }}
        onChangeStatus={async (available: boolean) => {
          await editEmployee(item.id, { available })
          mutate()
        }}
      />
    )
  }

  return (
    <>
      <Header
        title="Profissionais"
        actions={[
          <IconButton
            key="add"
            aria-label="Adicionar"
            onClick={async () => {
              setSelectedEmployee(null)
              setIsModalOpen(true)
            }}
          >
            <Icon>add_circle_outline</Icon>
          </IconButton>
        ]}
      />

      {!employees ? <Spin /> :
        <List
          count={employees.length}
          showing={8}
          renderItem={renderItem}
        />
      }

      {isModalOpen &&
        <EmployeeModal
          employee={selectedEmployee}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      }
    </>
  )
}

export default EmployeeArea