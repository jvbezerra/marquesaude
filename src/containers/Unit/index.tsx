import styles from '../../styles/Dashboard.module.scss'
import AppointmentArea from '../../components/AppointmentArea'
import EmployeeArea from '../../components/EmployeeArea'
import UserArea from '../../components/UsersArea'

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