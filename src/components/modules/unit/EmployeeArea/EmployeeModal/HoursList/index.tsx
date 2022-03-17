import { useState } from 'react'
import { Virtuoso as List } from 'react-virtuoso'

import Icon from '@mui/material/Icon'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import { StyledInput as Input } from '../../../../common/Input'
import ListItem from '../../../../common/ListItem'
import Button from '../../../../common/Button'

interface Props {
  employeeHours: Hour[],
  handleSubmit: (hours: Hour[]) => void,
}

const HoursList: React.FC<Props> = ({ employeeHours = [], handleSubmit }) => {
  const [newHour, setNewHour] = useState<string>('')

  return (
    <>
      <List
        data={employeeHours}
        components={{
          Header: () => (
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}>
                <Input
                  label="Novo horário"
                  mask="99:99"
                  value={newHour}
                  onChange={e => setNewHour(e.currentTarget.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="button"
                  style={{ height: 'unset' }}
                  onClick={() => handleSubmit([{ hour: newHour }, ...employeeHours])}
                >
                  Adicionar
                </Button>
              </Grid>
            </Grid>
          )
        }}
        itemContent={(_, item) => (
          <ListItem
            title={item.hour}
            actions={[
              <IconButton
                key="delete"
                aria-label="Apagar"
                onClick={async () => {}}
              >
                <Icon>delete_outline</Icon>
              </IconButton>,
            ]}
          />
        )}
      />
    </>
  )
}

export default HoursList