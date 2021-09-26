import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/client'
import HeaderBar from '../containers/HeaderBar'
const UnitDashboard = dynamic(() => import('../containers/UnitDashboard'))
const UserDashboard = dynamic(() => import('../containers/UserDashboard'))

const dashboardSchema = {
  "unit": <UnitDashboard />,
  "user": <UserDashboard />,
}

function App() {
  const [ session ] = useSession()

  return (
    !session ? <></> :
    <div>
      <HeaderBar />
      {dashboardSchema[session!.type]}
    </div>
  );
}

export default App;