import Header from '../../components/modules/common/AreaBar'
import { useSession } from 'next-auth/client'
import SchedulingArea from '../../components/modules/citizen/SchedulingArea'
import styles from '../../styles/Dashboard.module.scss'
import HeaderBar from '../../components/modules/common/HeaderBar'

const CitizenDashboard: React.FC = () => {
  const [ session ] = useSession()
  return (
    <>
      <HeaderBar/>
      <div className={styles.userContainer}>
        <div style={{ width: '90%' }}>
          <Header title="Consultas disponíveis" actions={[]} />
        </div>
        <SchedulingArea
          unitId={session?.unit?.id!}
          userId={session?.user?.id!}
        />
      </div>
    </>
  )
}

export default CitizenDashboard