import { useState } from 'react'
import styled from 'styled-components'

import List from '../../../List'
import ListItem from '../../../ListItem'
import Icon from '@mui/material/Icon'
import IconButton from '@mui/material/IconButton'
import TimeInput from '../../../Inputs/TimeInput'
import dayjs from 'dayjs'

interface Props {
  employeeHours: string[]
}

const HourInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const HoursList: React.FC<Props> = ({ employeeHours }) => {
  const [hours, setHours] = useState<string[]>(employeeHours)
  const [newHour, setNewHour] = useState<string>()

  const handleHourChange = (newValue: Date | null) => {
    setNewHour(dayjs(newValue).format('HH:mm'))
  }

  return (
    <>
      <List
        count={hours.length}
        showing={4}
        renderItem={({ index, style }: any) => (
          <ListItem
            title={hours[index]}
            style={style}
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

      <HourInput>
        <TimeInput
          value={newHour}
          onChange={handleHourChange}
        />
      </HourInput>
    </>
  )
}

export default HoursList