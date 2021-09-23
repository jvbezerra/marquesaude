import { Button, Card, Skeleton, Switch, Popconfirm } from 'antd'

import MedicalIcon from '@ant-design/icons/MedicineBoxOutlined'
import EyeIcon from '@ant-design/icons/EyeOutlined'
import DeleteIcon from '@ant-design/icons/DeleteOutlined'

interface Props {
  employee: Employee,
  onView: Function,
  onDelete: Function,
  onChangeStatus: Function,
}

const EmployeeCard: React.FC<Props> = ({ employee, onView, onDelete, onChangeStatus }) => {
  return (
    <Card
      style={{ marginLeft: '5%', marginRight: '5%', marginTop: 15 }}
      actions={[
        <Button
          key="view"
          aria-label="Visualizar"
          shape="circle"
          icon={<EyeIcon/>}
          onClick={() => onView()}
        />,
        <Popconfirm
          key="tooltip"
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
        </Popconfirm>,
        <Switch
          checked={employee.available}
          onChange={checked => onChangeStatus(checked)}
        />
      ]}
    >
      <Skeleton loading={!employee} avatar active>
        <Card.Meta
          avatar={<MedicalIcon/>}
          title={employee.name}
          description={`${employee.appointments?.length ?? 0} / ${employee.vacancies}`}
        />
      </Skeleton>
    </Card>
  )
}

export default EmployeeCard