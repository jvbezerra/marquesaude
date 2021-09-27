import styled from 'styled-components'
import Field, { inputStyle } from '../Field'
import MuiTimePicker, { MobileTimePickerProps as TimePickerProps } from '@mui/lab/MobileTimePicker'
import brLocale from 'dayjs/locale/pt-br'
import TextInput from '../TextInput'
import TimeAdapter from '@mui/lab/AdapterDayjs'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

interface Props extends TimePickerProps {
  label: string,
  error?: string | any,
}

const TimePicker = styled(MuiTimePicker)<Props>`
  ${inputStyle}
  border: ${props => props.error ? '1px solid red' : '1px solid #C1C3CF'};
`
const TimeInput = (props: Omit<Props, 'renderInput'>) => (
  <Field label={props.label ?? ''} error={props.error ?? ''}>
    <LocalizationProvider dateAdapter={TimeAdapter} locale={brLocale}>
      <TimePicker
        {...props}
        renderInput={
          ({ inputRef, inputProps }) => <TextInput ref={inputRef} {...inputProps} />
        }
      />
    </LocalizationProvider>
  </Field>
)

export default TimeInput