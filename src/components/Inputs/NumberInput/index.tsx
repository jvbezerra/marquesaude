import styled from 'styled-components'
import Field, { inputStyle, InputProps } from '../Field'
import {
  InputNumber as AntInputNumber,
  InputNumberProps,
} from 'antd'

interface NumberInputProps extends InputNumberProps, Pick<InputProps, 'label' | 'error'>{}

const InputNumber = styled(AntInputNumber)<NumberInputProps>`
  ${inputStyle}
  border: ${props => props.error ? '1px solid red' : '1px solid #C1C3CF'};
`
const NumberInput = (props: NumberInputProps) => (
  <Field label={props.label ?? ''} error={props.error ?? ''}>
    <InputNumber {...props}/>
  </Field>
)

export default NumberInput