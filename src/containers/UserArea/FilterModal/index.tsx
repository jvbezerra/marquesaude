import { Modal, Input } from "antd"
import { useState } from "react"

interface Props {
  isOpen: boolean,
  onClose: Function,
  setFilters: Function
}

const FilterModal = (props: Props) => {
  const handleSearch = (name: string) => {
    props.setFilters({ name })
  }

  return (
    <Modal
      title=""
      visible={props.isOpen}
      onCancel={() => props.onClose()}
      destroyOnClose
      footer={null}
    >
      <Input.Search
        size="large"
        placeholder="Insira um nome..."
        onSearch={value => handleSearch(value)}
      />
    </Modal>
  )
}

export default FilterModal