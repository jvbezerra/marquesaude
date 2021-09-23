import styled from 'styled-components'
import Field, { inputStyle, InputProps } from '../Field'
import { Select as AntSelect } from 'antd'
import { SelectProps } from 'antd/lib/select'

interface Props extends SelectProps<any>, Pick<InputProps, 'label' | 'error'>{}

const Select = styled(AntSelect)<Props>`
  ${inputStyle}
  border: ${props => props.error ? '1px solid red' : '1px solid #C1C3CF'};
`
const SelectInput = (props: Props) => (
  <Field label={props.label ?? ''} error={props.error ?? ''}>
    <Select {...props} />
  </Field>
)

export default SelectInput