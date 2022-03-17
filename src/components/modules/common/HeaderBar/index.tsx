import Image from 'next/image'
import { useState } from 'react'
import Icon from '@mui/material/Icon'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import dynamic from 'next/dynamic'
import { signOut, useSession } from 'next-auth/client'

import logo from '../../../../../public/logo.png'
import style from '../../../../styles/Header.module.scss'
const UserModal = dynamic(() => import('../../unit/UsersArea/UserModal'), { ssr: false })
const UnitModal = dynamic(() => import('../../unit/UnitModal'), { ssr: false })
const HelpModal = dynamic(() => import('../../unit/HelpModal'), { ssr: false })

const HeaderBar = () => {
  const [ session ] = useSession()
  const [isHelpModalOpen, setHelpModalOpen] = useState(false)
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false)
  
  return (
    <div className={style.header}>
      <div className="logo">
        <Image src={logo} width={256} height={104} alt="Marque Saúde" placeholder="blur"/>
      </div>
      <Typography>Unidade {session?.unit?.name}</Typography>
      <div className={style.options}>
        <IconButton
          aria-label="Configurações"
          onClick={() => setDetailsModalOpen(true)}
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
      
      {isDetailsModalOpen && session!.type == 'unit' &&
        <UnitModal
          isOpen={isDetailsModalOpen}
          onClose={() => setDetailsModalOpen(false)}
          unit={session!.unit!}
        />
      }

      {isDetailsModalOpen && session!.type == 'user' &&
        <UserModal
          isOpen={isDetailsModalOpen}
          onClose={() => setDetailsModalOpen(false)}
          user={session!.user!}
        />
      }
    </div>
  )
}

export default HeaderBar