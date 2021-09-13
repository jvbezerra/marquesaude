import Image from 'next/image'
import { useState } from 'react'
import { Button, Tooltip } from 'antd'
import dynamic from 'next/dynamic'
import { signOut, useSession } from 'next-auth/client'

import logo from '../../../public/logo.png'
import style from '../../styles/Header.module.scss'
const UnitModal = dynamic(() => import('./UnitModal'), { ssr: false })
const HelpModal = dynamic(() => import('./HelpModal'), { ssr: false })

import SettingsIcon from '@ant-design/icons/SettingOutlined'
import HelpIcon from '@ant-design/icons/QuestionCircleOutlined'
import LogoutIcon from '@ant-design/icons/LogoutOutlined'

const HeaderBar = () => {
  const [ session ] = useSession()
  const [isHelpModalOpen, setHelpModalOpen] = useState(false)
  const [isUnitModalOpen, setUnitModalOpen] = useState(false)
  
  return (
    <div className={style.header}>
      <div className="logo">
        <Image src={logo} width={256} height={104} alt="Marque Saúde" placeholder="blur"/>
      </div>
      <p>Unidade {session?.user.name}</p>
      <div className={style.options}>
        <Tooltip title="Unidade">
          <Button
            shape="circle"
            aria-label="Configurações"
            icon={<SettingsIcon/>}
            onClick={() => setUnitModalOpen(true)}
          />
        </Tooltip>
        <Tooltip title="Ajuda">
          <Button
            shape="circle"
            aria-label="Ajuda"
            icon={<HelpIcon/>}
            onClick={() => setHelpModalOpen(true)}
          />
        </Tooltip>
        <Tooltip title="Sair">
          <Button
            shape="circle"
            aria-label="Sair"
            icon={<LogoutIcon/>}
            onClick={() => signOut({ callbackUrl: '/' })}
          />
        </Tooltip>
      </div>

      {isHelpModalOpen && <HelpModal isOpen={isHelpModalOpen} onClose={() => setHelpModalOpen(false)}/>}
      
      {isUnitModalOpen &&
      <UnitModal
        isOpen={isUnitModalOpen}
        onClose={() => setUnitModalOpen(false)}
        unit={session?.user!}
      />}
    </div>
  )
}

export default HeaderBar