import { useState } from 'react'
import { Spin, Button, PageHeader, Popconfirm } from 'antd'
import { useSession } from 'next-auth/client'
import useSWR from 'swr'
import dynamic from 'next/dynamic'

import List from '../../components/List'
import ListItem from '../../components/ListItem'
import { deleteUser } from '../../services'
const UserModal = dynamic(() => import('./UserModal'), { ssr: false })

import PersonIcon from '@ant-design/icons/UserOutlined'
import AddIcon from '@ant-design/icons/PlusCircleOutlined'
import EyeIcon from '@ant-design/icons/EyeOutlined'
import DeleteIcon from '@ant-design/icons/DeleteOutlined'

const UserArea: React.FC = () => {
  const [ session ] = useSession()
  const { data: users, mutate } = useSWR<User[]>(`/users/unit/${session?.user.id!}`)

  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const renderItem = ({ index, style }: any) => {
    const item: User = users![index]
    
    return (
      <ListItem
        avatar={<PersonIcon/>}
        title={item.name}
        style={style}
        description={item.street}
        actions={[
          <Button
            key="view"
            aria-label="Visualizar"
            shape="circle"
            icon={<EyeIcon/>}
            onClick={async () => {
              setSelectedUser(item)
              setIsUserModalOpen(true)
            }}
          />,
          <Popconfirm
            key="tooltip"
            title="Tem certeza?"
            onConfirm={async () => {
              await deleteUser(item.id)
              mutate()
            }}
            okText="Sim"
            cancelText="Não"
          >
            <Button
              key="delete"
              aria-label="Deletar"
              shape="circle"
              icon={<DeleteIcon/>}
            />
          </Popconfirm>
        ]}
      />
    )
  }

  return (
    <>
      <PageHeader
        title="Usuários"
        extra={[
          <Button
            key="add"
            aria-label="Adicionar"
            shape="circle"
            icon={<AddIcon/>}
            onClick={async () => {
              setSelectedUser(null)
              setIsUserModalOpen(true)
            }}
          />,
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