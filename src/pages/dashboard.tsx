import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/client'

import style from '../styles/Dashboard.module.scss'
import HeaderBar from '../containers/HeaderBar'
const UserArea = dynamic(() => import('../containers/UserArea'), { ssr: false })
const AppointmentArea = dynamic(() => import('../containers/AppointmentArea'), { ssr: false })

function App() {
  const [ session ] = useSession()

  useEffect(() => {
    if (!session) signIn()
  }, [session])

  return (
    <div>
      <HeaderBar />
      <div className={style.area}>
        <div className={style.container}>
          <UserArea />
        </div>
        <div className={style.container}>
          <AppointmentArea />
        </div>
      </div>
    </div>
  );
}

export default App;