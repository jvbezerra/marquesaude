import { Controller } from "react-hook-form"
import InputMask, { Props as MaskProps } from "react-input-mask"
import styled from "@emotion/styled"
import Field, {InputProps, inputStyle} from "../Field"

const StyledInput = styled(InputMask)<InputProps>`
  ${inputStyle}
  border: ${props => props.error ? '1px solid red' : '1px solid #C1C3CF'};
`
const TextInput = (props: InputProps & Omit<MaskProps, 'mask'>) => {
  const { name, control, label, error, mask, ...maskProps } = props
  return (
    <Controller
      name={name!}
      defaultValue={false}
      rules={{ required: true, min: 5 }}
      control={control}
      render={({ field }) => (
        <Field label={label} error={error}>
          <StyledInput mask={mask ?? ''} maskPlaceholder={null} {...field} {...maskProps}/>
        </Field>
      )}
    />
  )
}

export default TextInput