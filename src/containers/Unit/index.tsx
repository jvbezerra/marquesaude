import styles from '../../styles/Dashboard.module.scss'
import AppointmentArea from './AppointmentArea'
import EmployeeArea from './EmployeeArea'
import UserArea from './UsersArea'

const UnitDashboard: React.FC = () => {
  return (
    <div className={styles.area}>
      <div className={styles.container}>
        <AppointmentArea />
      </div>
      <div className={styles.container}>
        <UserArea />
      </div>
      <div className={styles.container}>
        <EmployeeArea />
      </div>
    </div>
  )
}

export default UnitDashboard