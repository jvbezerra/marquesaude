import styled from 'styled-components'
import Field, { InputProps, inputStyle } from '../Field'
import MuiSelect, { SelectProps } from '@mui/material/Select'
import { Controller } from 'react-hook-form'

interface Props extends SelectProps<any> {
  label: string,
  error?: string | any
}

const Select = styled(MuiSelect)<Omit<Props, 'error' | 'label'>>`
  ${inputStyle}
  border: ${props => props.error ? '1px solid red' : '1px solid #C1C3CF'};
`
const SelectInput = (props: InputProps & Props) => {
  const { name, control, ...selectProps } = props
  return (
    <Controller
      name={name!}
      control={control}
      render={({ field }) => (
        <Field label={props.label} error={props.error}>
          <Select {...field} {...selectProps} style={{ border: 'none'}} />
        </Field>
      )}
    />
  )
}

export default SelectInput