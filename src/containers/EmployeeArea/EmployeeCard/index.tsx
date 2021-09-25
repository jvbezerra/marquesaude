import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import Icon from '@mui/material/Icon'
import IconButton from '@mui/material/IconButton'
import Switch from '@mui/material/Switch'

interface Props {
  employee: Employee,
  onView: Function,
  onDelete: Function,
  onChangeStatus: Function,
}

const EmployeeCard: React.FC<Props> = ({ employee, onView, onDelete, onChangeStatus }) => (
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
    <CardActions>
      <IconButton
        key="view"
        aria-label="Visualizar"
        onClick={() => onView()}
      >
        <Icon>visibility</Icon>
      </IconButton>
      <IconButton
        key="delete"
        aria-label="Apagar"
        onClick={() => onDelete()}
      >
        <Icon>delete_outline</Icon>
      </IconButton>
      <Switch
        checked={employee.available}
        onChange={e => onChangeStatus(e.target.checked)}
        inputProps={{ 'aria-label': 'controlled' }}
      />
    </CardActions>
  </Card>
)

export default EmployeeCard