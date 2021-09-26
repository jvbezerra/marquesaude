import styles from '../../styles/Dashboard.module.scss'
import EmployeeArea from './EmployeeArea'
import UserArea from './UsersArea'

const UnitDashboard: React.FC = () => (
  <div className={styles.area}>
    <div className={styles.container}>
      <UserArea />
    </div>
    <div className={styles.container}>
      <EmployeeArea />
    </div>
  </div>
)

export default UnitDashboard