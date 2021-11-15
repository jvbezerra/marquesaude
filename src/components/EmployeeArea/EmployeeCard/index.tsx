import useSWR from 'swr'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Icon from '@mui/material/Icon'

interface Props {
  employee: Employee,
}

const EmployeeCard: React.FC<Props> = ({ employee, children }) => {
  const { data: roles } = useSWR<EmployeeRole[]>(`/employees/roles`)

  return (
    <Card style={{ marginTop: 15 }}>
      <CardHeader
        avatar={
          <Icon
            className="material-icons-outlined"
            color="action"
          >
            local_hospital
          </Icon>
        }
        title={employee.name}
        subheader={roles?.find(role => role.id == employee.roleId)?.name}
      />
      {children}
    </Card>
  )
}

export default EmployeeCard