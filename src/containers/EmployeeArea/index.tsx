import { useState } from 'react'
import { PageHeader, Spin, Button } from 'antd'
import { useSession } from 'next-auth/client'
import useSWR from 'swr'
import dynamic from 'next/dynamic'

import List from '../../components/List'
const EmployeeModal = dynamic(() => import('./EmployeeModal'), { ssr: false })
import { deleteEmployee, editEmployee } from '../../services'

import AddIcon from '@ant-design/icons/PlusCircleOutlined'
import EmployeeCard from './EmployeeCard'

const EmployeeArea: React.FC = () => {
  const [ session ] = useSession()
  const { data: employees, mutate } = useSWR(`/employees/unit/${session?.user.id!}`)

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
      <PageHeader
        title="Profissionais"
        extra={[
          <Button
            key="add"
            aria-label="Adicionar"
            shape="circle"
            icon={<AddIcon/>}
            onClick={async () => {
              setSelectedEmployee(null)
              setIsModalOpen(true)
            }}
          />
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
          unitId={session?.user.id!}
          employee={selectedEmployee}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mutate={mutate}
        />
      }
    </>
  )
}

export default EmployeeArea