import useSWR from 'swr'
import { useState } from 'react'
import { useSession } from 'next-auth/client'
import CardActions from '@mui/material/CardActions'

import SelectItem from '@mui/material/MenuItem'
import HeaderBar from '../../../components/HeaderBar'
import SelectInput from '../../../components/Inputs/SelectInput'
import Header from '../../../components/PageHeader'
import { Virtuoso as List } from 'react-virtuoso'
import styles from '../../../styles/Dashboard.module.scss'
import EmployeeCard from '../../../components/EmployeeArea/EmployeeCard'
import { appointmentSchema } from './_schema'
import dayjs from 'dayjs'
import Loading from '../../../components/Loading'

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

  const EmployeeItem: React.FC<{ index: number }> = ({ index }) => {
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
    !session ? <></> :
    <>
      <HeaderBar/>
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

        {!employees ? <Loading /> :
          <List
            data={employees}
            itemContent={idx => <EmployeeItem index={idx}/>}
          />
        }
      </div>
    </>
  )
}

export default CitizenDashboard