import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import prisma from '../../lib/prisma'

import styles from '../../styles/Dashboard.module.scss'
import AppointmentArea from '../../components/modules/unit/AppointmentArea'
import EmployeeArea from '../../components/modules/unit/EmployeeArea'
import UserArea from '../../components/modules/unit/UsersArea'
import HeaderBar from '../../components/modules/common/HeaderBar'

interface Props {
  appointments: Appointment[]
  users: Citizen[]
  employees: Employee[]
}

const UnitDashboard: React.FC<Props> = ({ appointments, users, employees }) => (
  <>
    <HeaderBar/>
    <div className={styles.area}>
      <div className={styles.container}>
        <AppointmentArea appointments={appointments}/>
      </div>
      <div className={styles.container}>
        <UserArea users={users}/>
      </div>
      <div className={styles.container}>
        <EmployeeArea employees={employees}/>
      </div>
    </div>
  </>
)

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const unitId = session?.unit?.id

  const users = await prisma.user.findMany({ where: { unitId }})
  
  const employees = await prisma.employee.findMany({ include: { hours: true }, where: { unitId }})
  
  const appointments = (await prisma.appointment.findMany({
    include: { employee: true, user: true },
    where: { employee: { unitId } }
  })).map((entity: Appointment & { date: Date }) => {
    entity.date = entity.date?.toJSON() as any
    return entity
  })

  return { props: { appointments, users, employees } }
}

export default UnitDashboard