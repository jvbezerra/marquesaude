import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import { AuthContext } from '../contexts/auth'
import style from '../styles/Dashboard.module.scss'
import HeaderBar from '../containers/HeaderBar'
const UserArea = dynamic(() => import('../containers/UserArea'), { ssr: false })
const AppointmentArea = dynamic(() => import('../containers/AppointmentArea'), { ssr: false })

function App() {
  const router = useRouter()
  const { unit } = useContext(AuthContext)

  useEffect(() => {
    if (!unit) router.push('/')
  }, [unit])

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