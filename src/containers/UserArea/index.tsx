import { useState } from 'react'
import { Spin, Button, PageHeader } from 'antd'
import { useSession } from 'next-auth/client'
import useSWR from 'swr'

import List from '../../components/List'
import ListItem from '../../components/ListItem'
import FilterModal from './FilterModal'
import { deleteUser } from '../../services'
import UserModal from './UserModal'

import PersonIcon from '@ant-design/icons/UserOutlined'
import AddIcon from '@ant-design/icons/PlusCircleOutlined'
import FilterIcon from '@ant-design/icons/FilterOutlined'

const UserArea: React.FC = () => {
  const [ session ] = useSession()
  const { data: users, mutate } = useSWR<User[]>(`/users/unit/${session?.user.id!}`)

  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [filters, setFilters] = useState<{ name: string }>({ name: '' })

  const renderItem = ({ index, style }: any) => {
    const filteredUsers = users!.filter(user => user.name.includes(filters.name))
    const item: User = filteredUsers[index]
    
    return (
      <ListItem
        avatar={<PersonIcon/>}
        title={item.name}
        style={style}
        description={item.address}
        onDelete={async () => {
          await deleteUser(item.id)
          mutate()
        }}
        onView={async () => {
          setSelectedUser(item)
          setIsUserModalOpen(true)
        }}
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
          <Button
            key="filter"
            aria-label="Filtrar"
            shape="circle"
            icon={<FilterIcon/>}
            onClick={() => setIsFilterModalOpen(true)}
          />
        ]}
      />

      {!users ? <Spin /> :
        <List
          count={users.length}
          showing={8}
          renderItem={renderItem}
        />
      }

      <UserModal
        unitId={session?.user.id!}
        user={selectedUser}
        isOpen={isUserModalOpen}
        onClose={() => {
          setIsUserModalOpen(false)
          mutate()
        }}
      />
      <FilterModal
        setFilters={(value: any) => setFilters(value)}
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      />
    </>
  )
}

export default UserArea