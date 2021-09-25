import Image from 'next/image'
import { useState } from 'react'
import Icon from '@mui/material/Icon'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import dynamic from 'next/dynamic'
import { signOut, useSession } from 'next-auth/client'

import logo from '../../../public/logo.png'
import style from '../../styles/Header.module.scss'
const UnitModal = dynamic(() => import('./UnitModal'), { ssr: false })
const HelpModal = dynamic(() => import('./HelpModal'), { ssr: false })

const HeaderBar = () => {
  const [ session ] = useSession()
  const [isHelpModalOpen, setHelpModalOpen] = useState(false)
  const [isUnitModalOpen, setUnitModalOpen] = useState(false)
  
  return (
    <div className={style.header}>
      <div className="logo">
        <Image src={logo} width={256} height={104} alt="Marque Saúde" placeholder="blur"/>
      </div>
      <Typography>Unidade {session?.user.name}</Typography>
      <div className={style.options}>
        <IconButton
          aria-label="Configurações"
          onClick={() => setUnitModalOpen(true)}
        >
          <Icon>settings</Icon>
        </IconButton>
        <IconButton
          aria-label="Ajuda"
          onClick={() => setHelpModalOpen(true)}
        >
          <Icon>help_outline</Icon>
        </IconButton>
        <IconButton
          aria-label="Sair"
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          <Icon>logout</Icon>
        </IconButton>
      </div>

      {isHelpModalOpen && <HelpModal isOpen={isHelpModalOpen} onClose={() => setHelpModalOpen(false)}/>}
      
      {isUnitModalOpen &&
        <UnitModal
          isOpen={isUnitModalOpen}
          onClose={() => setUnitModalOpen(false)}
          unit={session?.user!}
        />
      }
    </div>
  )
}

export default HeaderBar