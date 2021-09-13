import React from 'react'
import { Button, List, Popconfirm } from 'antd'
import { ListItemMetaProps, ListItemProps } from 'antd/lib/list'

import EyeIcon from '@ant-design/icons/EyeOutlined'
import DeleteIcon from '@ant-design/icons/DeleteOutlined'

interface Props extends ListItemProps, ListItemMetaProps {
  title: string,
  onView: Function,
  onDelete: Function,
}

const ListItem: React.FC<Props> = (props) => {
  const { avatar, title, description, onView, onDelete } = props

  return (
    <List.Item
      style={props.style}
      actions={[
        <Button
          key="view"
          aria-label="Visualizar"
          shape="circle"
          icon={<EyeIcon/>}
          onClick={() => onView()}
        />,
        <Popconfirm
          title="Tem certeza?"
          onConfirm={() => onDelete()}
          okText="Sim"
          cancelText="Não"
        >
          <Button
            key="delete"
            aria-label="Deletar"
            shape="circle"
            icon={<DeleteIcon/>}
            onClick={() => {}}
          />
        </Popconfirm>
      ]}
    >
      <List.Item.Meta
        avatar={avatar}
        title={title}
        description={description}
      />
    </List.Item>
  )
}

export default ListItem