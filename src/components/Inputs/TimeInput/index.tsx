import styled from 'styled-components'
import Field, { inputStyle, InputProps } from '../Field'
import { TimePicker as AntTimePicker } from 'antd'
import { PickerTimeProps } from 'antd/lib/date-picker/generatePicker'

interface Props extends Omit<PickerTimeProps<any>, 'picker'>, Pick<InputProps, 'label' | 'error'>{}

const TimePicker = styled(AntTimePicker)<Props>`
  ${inputStyle}
  border: ${props => props.error ? '1px solid red' : '1px solid #C1C3CF'};
`
const TimeInput = (props: Props) => (
  <Field label={props.label ?? ''} error={props.error ?? ''}>
    <TimePicker
      {...props}
      placeholder="Selecione a hora"
    />
  </Field>
)

export default TimeInput