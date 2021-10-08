import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/client'
import HeaderBar from '../containers/HeaderBar'
const UnitDashboard = dynamic(() => import('../containers/UnitDashboard'))
const CitizenDashboard = dynamic(() => import('../containers/CitizenDashboard'))

const dashboardSchema = {
  "unit": <UnitDashboard />,
  "user": <CitizenDashboard />,
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