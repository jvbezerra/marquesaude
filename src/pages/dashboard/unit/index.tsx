import { useSession } from 'next-auth/client'

import styles from '../../../styles/Dashboard.module.scss'
import EmployeeArea from '../../../components/EmployeeArea'
import UserArea from '../../../components/UsersArea'
import HeaderBar from '../../../components/HeaderBar'

const UnitDashboard: React.FC = () => {
  const [ session ] = useSession()

  return (
    !session ? <></> :
    <>
      <HeaderBar/>
      <div className={styles.area}>
        <div className={styles.container}>
          <UserArea />
        </div>
        <div className={styles.container}>
          <EmployeeArea />
        </div>
      </div>
    </>
  )
}

export default UnitDashboard