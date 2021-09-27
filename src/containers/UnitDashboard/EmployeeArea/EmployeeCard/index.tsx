import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Icon from '@mui/material/Icon'

interface Props {
  employee: Employee,
}

const EmployeeCard: React.FC<Props> = ({ employee, children }) => (
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
      subheader={`${employee.appointments?.length ?? 0} / ${employee.vacancies}`}
    />
    {children}
  </Card>
)

export default EmployeeCard