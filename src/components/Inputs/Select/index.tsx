import styled from '@emotion/styled'
import { Field } from '../Field'
import MuiSelect, { SelectProps } from '@mui/material/Select'
import { Control, Controller } from 'react-hook-form'

interface Props extends SelectProps<any> {
  name: string,
  label: string,
  error?: string | any,
  control: Control<any>
}

const Select = styled(MuiSelect)<Omit<Props, 'error' | 'label' | 'control'>>`
  background: #FFFFFF;
  border-radius: 8px;
  width: 100%;
  height: 5vh !important;
  min-height: 40px;
  padding: 2% 5%;
  box-sizing: border-box;
  border: ${props => props.error ? '1px solid red' : '1px solid #C1C3CF'};
`

const SelectInput = (props: Props) => {
  const { name, control, ...selectProps } = props
  return (
    <Controller
      name={name}
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