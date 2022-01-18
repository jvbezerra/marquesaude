import { useState } from 'react'
import Icon from '@mui/material/Icon'
import IconButton from '@mui/material/IconButton'
import CardActions from '@mui/material/CardActions'
import Switch from '@mui/material/Switch'
import { useSession } from 'next-auth/client'
import useSWR from 'swr'
import dynamic from 'next/dynamic'

import { Virtuoso as List } from 'react-virtuoso'
import Header from '../../../components/PageHeader'
const EmployeeModal = dynamic(() => import('../../../components/Modals/EmployeeModal'), { ssr: false })
import { EmployeeService } from '../../../services'
import EmployeeCard from './EmployeeCard'
import Loading from '../../../components/Loading'

const EmployeeArea: React.FC = () => {
  const [ session ] = useSession()
  const { data: employees, mutate } = useSWR(`/employees/unit/${session!.unit!.id}`)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  const EmployeeItem: React.FC<{ item: Employee }> = ({ item }) => (
    <EmployeeCard employee={item}>
      <CardActions>
        <IconButton
          key="view"
          aria-label="Visualizar"
          onClick={async () => {
            setSelectedEmployee(item)
            setIsModalOpen(true)
          }}
        >
          <Icon>visibility</Icon>
        </IconButton>
        <IconButton
          key="delete"
          aria-label="Apagar"
          onClick={async () => {
            await EmployeeService.exclude(item.id)
            mutate()
          }}
        >
          <Icon>delete_outline</Icon>
        </IconButton>
        <Switch
          checked={item.available}
          onChange={async ({ target }) => {
            await EmployeeService.edit(item.id, { available: target.checked })
            mutate()
          }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </CardActions>
    </EmployeeCard>
  )

  return (
    <>
      {!employees ? <Loading /> :
        <List
          data={employees}
          itemContent={(_, employee) => <EmployeeItem item={employee}/>}
          components={{
            Header: () => (
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
            )
          }}
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