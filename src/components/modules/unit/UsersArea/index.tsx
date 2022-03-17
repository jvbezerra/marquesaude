import { useState } from 'react'
import Icon from '@mui/material/Icon'
import IconButton from '@mui/material/IconButton'
import { useSession } from 'next-auth/client'
import dynamic from 'next/dynamic'
import useSWR from 'swr'

import { Virtuoso as List } from 'react-virtuoso'
import ListItem from '../../common/ListItem'
import Header from '../../common/AreaBar'
import Loading from '../../common/Loading'
import useAPI from '../../../../hooks/useAPI'
const UserModal = dynamic(() => import('./UserModal'), { ssr: false })

const UserArea: React.FC<{ users: Citizen[] }> = ({ users: fallbackData }) => {
  const [ session ] = useSession()
  const { data: users, mutate } = useSWR<Citizen[]>(`/users?id=${session?.unit?.id}`, { fallbackData })
  const UserService = useAPI<Citizen>('users')

  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<Citizen | null>(null)

  const UserItem: React.FC<{ item: Citizen }> = ({ item }) => (
    <ListItem
      title={item.name}
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

  return (
    <>
      {!users ? <Loading /> :
        <List
          data={users}
          itemContent={(_, user) => <UserItem item={user}/>}
          components={{
            Header: () => (
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
            )
          }}
        />
      }

      {isUserModalOpen &&
        <UserModal
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