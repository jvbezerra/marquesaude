import useSWR from 'swr'
import { useState } from 'react'
import { useSession } from 'next-auth/client'
import CardActions from '@mui/material/CardActions'
import Spin from '@mui/material/CircularProgress'

import SelectItem from '@mui/material/MenuItem'
import SelectInput from '../../components/Inputs/SelectInput'
import Header from '../../components/PageHeader'
import List from '../../components/List'
import styles from '../../styles/Dashboard.module.scss'
import EmployeeCard from '../UnitDashboard/EmployeeArea/EmployeeCard'
import { appointmentSchema } from './schema'
import dayjs from 'dayjs'

const CitizenDashboard: React.FC = () => {
  const [ session ] = useSession()
  const [filterRole, setFilterRole] = useState(0)
  const { data: employees, mutate } = useSWR<Employee[]>(`/employees/unit/${session!.unit!.id}`)
  const { data: rolesOptions } = useSWR<EmployeeRole[]>(`/employees/roles`)

  const sameDay = (dateA: Date, dateB: Date): boolean => {
    return dateA.getFullYear() === dateB.getFullYear() &&
           dateA.getMonth() === dateB.getMonth() &&
           dateA.getDate() === dateB.getDate()
  }

  const renderItem = ({ index, style }: any) => {
    const item: Employee = employees![index]

    const employeeAppointment: any = item.Appointments?.filter(appointment => (
      appointment.userId === session!.user!.id
      && sameDay(dayjs(employeeAppointment?.date!).toDate(), new Date())
    ))[0]

    const Option = appointmentSchema[employeeAppointment?.status ?? 'available']

    return (
      <EmployeeCard employee={item} key={index}>
        <CardActions>
          <Option
            employeeId={item.id}
            scheduledHour={employeeAppointment?.hour}
            userId={session!.user!.id}
            mutate={mutate}
          />
        </CardActions>
      </EmployeeCard>
    )
  }

  return (
    <div className={styles.userContainer}>
      <div style={{ width: '90%' }}>
        <Header
          title="Consultas disponíveis"
          actions={[
            <div style={{ width: '30vw' }} key="options">
              <SelectInput
                label="Filtrar"
                defaultValue={0}
                onChange={e => setFilterRole(e.target.value)}
              >
                {rolesOptions && [...rolesOptions, { id: 0, name: 'Todos' }]
                  .map(role => (
                    <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                  ))}
              </SelectInput>
            </div>
          ]}
        />
      </div>

      <div style={{ width: '90vw' }}>
        {!employees ? <Spin /> :
          <List
            count={employees.length}
            showing={4}
            renderItem={renderItem}
          />
        }
      </div>
    </div>
  )
}

export default CitizenDashboard