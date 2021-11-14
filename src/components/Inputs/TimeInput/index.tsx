import Field from '../BaseField'
import TimePicker, { MobileTimePickerProps as TimePickerProps } from '@mui/lab/MobileTimePicker'
import brLocale from 'dayjs/locale/pt-br'
import TimeAdapter from '@mui/lab/AdapterDayjs'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

interface Props extends TimePickerProps {
  label?: string,
  error?: string | any,
  onChange: any,
}

const TimeInput = (props: Props) => {
  const { label, error, ...inputProps } = props
  return (
    <LocalizationProvider dateAdapter={TimeAdapter} locale={brLocale}>
      <TimePicker
        {...inputProps}
        renderInput={({ onChange, value, ref }) => (
          <Field
            label={label}
            error={error}
            onChange={onChange}
            value={value}
            ref={ref}
          />
        )}
      />
    </LocalizationProvider>
  )
}

export default TimeInput