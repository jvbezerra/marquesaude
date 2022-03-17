import MuiListItem, { ListItemProps } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

interface Props extends ListItemProps {
  title: string,
  description?: string,
  actions: React.ReactNode[]
}

const ListItem: React.FC<Props> = (props) => {
  const { title, description, actions } = props

  return (
    <MuiListItem key={title} secondaryAction={actions}>
      <ListItemText primary={title} secondary={description} />
    </MuiListItem>
  )
}

export default ListItem