import { useState } from 'react'
import Icon from '@mui/material/Icon'
import IconButton from '@mui/material/IconButton'
import Spin from '@mui/material/CircularProgress'
import { useSession } from 'next-auth/client'
import useSWR from 'swr'
import dynamic from 'next/dynamic'

import List from '../../../components/List'
import ListItem from '../../../components/ListItem'
import Header from '../../../components/PageHeader'
import { UserService } from '../../../services'
const UserModal = dynamic(() => import('./UserModal'), { ssr: false })

const UserArea: React.FC = () => {
  const [ session ] = useSession()
  const { data: users, mutate } = useSWR<Citizen[]>(`/users/unit/${session!.unit!.id}`)

  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<Citizen | null>(null)

  const renderItem = ({ index, style }: any) => {
    const item: Citizen = users![index]
    
    return (
      <ListItem
        title={item.name}
        style={style}
        description={item.street}
        actions={[
          <IconButton
            key="view"
            aria-label="Visualizar"
            onClick={async () => {
              setSelectedUser(item)
              setIsUserModalOpen(true)
            }}
          >
            <Icon>visibility</Icon>
          </IconButton>,
          <IconButton
            key="delete"
            aria-label="Apagar"
            onClick={async () => {
              await UserService.exclude(item.id)
              mutate()
            }}
          >
            <Icon>delete_outline</Icon>
          </IconButton>,
        ]}
      />
    )
  }

  return (
    <>
      <Header
        title="Usuários"
        actions={[
          <IconButton
            key="add"
            aria-label="Adicionar"
            onClick={async () => {
              setSelectedUser(null)
              setIsUserModalOpen(true)
            }}
          >
            <Icon>add_circle_outline</Icon>
          </IconButton>,
        ]}
      />

      {!users ? <Spin /> :
        <List
          count={users.length}
          showing={8}
          renderItem={renderItem}
        />
      }

      {isUserModalOpen &&
        <UserModal
          user={selectedUser}
          isOpen={isUserModalOpen}
          onClose={() => setIsUserModalOpen(false)}
        />
      }
    </>
  )
}

export default UserArea