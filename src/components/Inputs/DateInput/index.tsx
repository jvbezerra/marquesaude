import styled from 'styled-components'
import Field, { inputStyle } from '../Field'
import MuiDatePicker, { DatePickerProps } from '@mui/lab/DatePicker'
import brLocale from 'dayjs/locale/pt-br'
import TextInput from '../TextInput'
import DateAdapter from '@mui/lab/AdapterDayjs'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

interface Props extends DatePickerProps {
  label: string,
  error?: string | any,
}

const DatePicker = styled(MuiDatePicker)<Props>`
  ${inputStyle}
  border: ${props => props.error ? '1px solid red' : '1px solid #C1C3CF'};
`
const DateInput = (props: Omit<Props, 'renderInput'>) => (
  <Field label={props.label ?? ''} error={props.error ?? ''}>
    <LocalizationProvider dateAdapter={DateAdapter} locale={brLocale}>
      <DatePicker
        disableFuture
        openTo="year"
        {...props}
        renderInput={
          ({ inputRef, inputProps }) => <TextInput ref={inputRef} {...inputProps} />
        }
      />
    </LocalizationProvider>
  </Field>
)

export default DateInput