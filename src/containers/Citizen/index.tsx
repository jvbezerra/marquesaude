import Header from '../../components/PageHeader'
import { useSession } from 'next-auth/client'
import SchedulingArea from './SchedulingArea'
import styles from '../../styles/Dashboard.module.scss'

const CitizenDashboard: React.FC = () => {
  const [ session ] = useSession()
  return (
    <div className={styles.userContainer}>
      <div style={{ width: '90%' }}>
        <Header title="Consultas disponíveis" actions={[]} />
      </div>
      <SchedulingArea
        unitId={session?.unit?.id!}
        userId={session?.user?.id!}
      />
    </div>
  )
}

export default CitizenDashboard