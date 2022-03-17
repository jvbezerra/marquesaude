import styled from '@emotion/styled'
import InputMask from 'react-input-mask'
import { Controller, Control} from "react-hook-form"
import Field, { FieldProps } from "../Field"

interface Props extends FieldProps {
  control: Control<any>
}

export const StyledInput = styled(InputMask)<FieldProps>`
  background: #FFFFFF;
  border-radius: 8px;
  width: 100%;
  height: 5vh !important;
  min-height: 40px;
  padding: 2% 5%;
  box-sizing: border-box;
  border: ${props => props.error ? '1px solid red' : '1px solid #C1C3CF'};
`

const TextInput = (props: Props) => {
  const { name, control, label, error, mask, ...inputProps } = props
  return (
    <Controller
      name={name!}
      defaultValue={false}
      rules={{ required: true, min: 5 }}
      control={control}
      render={({ field }) => (
        <Field label={label} error={error}>
          <StyledInput
            mask={mask ?? ''}
            maskPlaceholder={null}
            {...field}
            {...inputProps}
          />
        </Field>
      )}
    />
  )
}

export default TextInput