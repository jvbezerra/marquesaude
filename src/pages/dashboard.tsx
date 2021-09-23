import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/client'

import style from '../styles/Dashboard.module.scss'
import HeaderBar from '../containers/HeaderBar'
const UserArea = dynamic(() => import('../containers/UserArea'))
const EmployeeArea = dynamic(() => import('../containers/EmployeeArea'))

function App() {
  const [ session ] = useSession()

  return (
    !session ? <></> :
    <div>
      <HeaderBar />
      <div className={style.area}>
        <div className={style.container}>
          <UserArea />
        </div>
        <div className={style.container}>
          <EmployeeArea />
        </div>
      </div>
    </div>
  );
}

export default App;