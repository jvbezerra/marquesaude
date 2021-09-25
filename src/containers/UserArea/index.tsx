import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Spin from '@mui/material/CircularProgress'
import { useSession } from 'next-auth/client'
import useSWR from 'swr'
import dynamic from 'next/dynamic'

import List from '../../components/List'
import ListItem from '../../components/ListItem'
import Header from '../../components/PageHeader'
import { deleteUser } from '../../services'
const UserModal = dynamic(() => import('./UserModal'), { ssr: false })

import Icon from '@mui/material/Icon'

const UserArea: React.FC = () => {
  const [ session ] = useSession()
  const { data: users, mutate } = useSWR<User[]>(`/users/unit/${session?.user.id!}`)

  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const renderItem = ({ index, style }: any) => {
    const item: User = users![index]
    
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
            key="view"
            aria-label="Visualizar"
            onClick={async () => {
              await deleteUser(item.id)
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
          unitId={session?.user.id!}
          user={selectedUser}
          isOpen={isUserModalOpen}
          onClose={() => setIsUserModalOpen(false)}
          mutate={mutate}
        />
      }
    </>
  )
}

export default UserArea