import styled from 'styled-components'
import Field, { inputStyle } from '../Field'
import MuiSelect, { SelectProps } from '@mui/material/Select'

interface Props extends SelectProps<any> {
  label: string,
  error?: string | any
}

const Select = styled(MuiSelect)<Omit<Props, 'error' | 'label'>>`
  ${inputStyle}
  border: ${props => props.error ? '1px solid red' : '1px solid #C1C3CF'};
`
const SelectInput = (props: Props) => (
  <Field label={props.label ?? ''} error={props.error ?? ''}>
    <Select {...props} style={{ border: 'none'}} />
  </Field>
)

export default SelectInput