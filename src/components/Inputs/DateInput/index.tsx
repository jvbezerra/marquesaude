import styled from '@emotion/styled'
import Field, { InputProps, inputStyle } from '../Field'
import MuiDatePicker, { MobileDatePickerProps as DatePickerProps } from '@mui/lab/MobileDatePicker'
import brLocale from 'dayjs/locale/pt-br'
import TextInput from '../TextInput'
import DateAdapter from '@mui/lab/AdapterDayjs'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { Controller } from 'react-hook-form'

interface Props extends Omit<DatePickerProps, 'label' | 'onChange' | 'value' | 'renderInput'> {
  label: string,
  error?: string | any,
}

const Input = styled.input<Pick<InputProps, 'error'>>`
  ${inputStyle}
  border: ${props => props.error ? '1px solid red' : '1px solid #C1C3CF'};
`

const DateInput = (props: InputProps & Props) => {
  const { name, control, label, error, ...pickerProps } = props
  return (
    <Controller
      name={name!}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Field label={label} error={error}>
          <LocalizationProvider dateAdapter={DateAdapter} locale={brLocale}>
            <MuiDatePicker
              {...pickerProps}
              label={label} 
              disableFuture
              openTo="year"
              onChange={onChange}
              value={value}
              renderInput={
                ({ inputRef, inputProps }) => <Input ref={inputRef} {...inputProps} />
              }
            />
          </LocalizationProvider>
        </Field>
      )}
    />
  )
}

export default DateInput