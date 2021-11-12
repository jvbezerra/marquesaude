import { useSession } from 'next-auth/client'

import styles from '../../../styles/Dashboard.module.scss'
import EmployeeArea from '../../../containers/UnitDashboard/EmployeeArea'
import UserArea from '../../../containers/UnitDashboard/UsersArea'
import HeaderBar from '../../../containers/HeaderBar'

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