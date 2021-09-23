import React from 'react'
import { Button, List, Popconfirm } from 'antd'
import { ListItemMetaProps, ListItemProps } from 'antd/lib/list'

interface Props extends ListItemProps, ListItemMetaProps {
  title: string
}

const ListItem: React.FC<Props> = (props) => {
  const { avatar, title, description, ...itemProps } = props

  return (
    <List.Item {...itemProps}>
      <List.Item.Meta
        avatar={avatar}
        title={title}
        description={description}
      />
    </List.Item>
  )
}

export default ListItem