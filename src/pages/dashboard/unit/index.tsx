import { useSession } from 'next-auth/client'

import styles from '../../../styles/Dashboard.module.scss'
import EmployeeArea from './_EmployeeArea'
import UserArea from './_UsersArea'
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