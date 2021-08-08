import styled from 'styled-components'
import Field, { inputStyle, InputProps } from '../Field'
import { DatePicker as AntDatePicker } from 'antd'
import { PickerDateProps } from 'antd/lib/date-picker/generatePicker'

interface Props extends PickerDateProps<any>, Pick<InputProps, 'label' | 'error'>{}

const DatePicker = styled(AntDatePicker)<Props>`
  ${inputStyle}
  border: ${props => props.error ? '1px solid red' : '1px solid #C1C3CF'};
`
const DateInput = (props: Props) => (
  <Field label={props.label ?? ''} error={props.error ?? ''}>
    <DatePicker
      {...props}
      placeholder="Selecione a data"
    />
  </Field>
)

export default DateInput