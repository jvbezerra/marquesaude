import Image from 'next/image'
import { useState } from 'react'
import { Button, Tooltip } from 'antd'
import { signOut, useSession } from 'next-auth/client'

import HelpModal from './HelpModal'
import logo from '../../../public/logo.png'
import style from '../../styles/Header.module.scss'
import UnitModal from './UnitModal'

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
            onClick={() => signOut()}
          />
        </Tooltip>
      </div>

      <HelpModal isOpen={isHelpModalOpen} onClose={() => setHelpModalOpen(false)}/>
      
      <UnitModal
        isOpen={isUnitModalOpen}
        onClose={() => setUnitModalOpen(false)}
        unit={session?.user!}
      />
    </div>
  )
}

export default HeaderBar