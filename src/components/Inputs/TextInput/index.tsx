import InputMask, { Props as MaskProps } from "react-input-mask"
import styled from "styled-components"
import Field, {InputProps, inputStyle} from "../Field"

const StyledInput = styled(InputMask)<InputProps>`
  ${inputStyle}
  border: ${props => props.error ? '1px solid red' : '1px solid #C1C3CF'};
`
const TextInput = (props: InputProps & Omit<MaskProps, 'mask'>) => {
  const { label, error, mask, ...maskProps } = props
  return (
    <Field label={label ?? ''} error={error ?? ''}>
      <StyledInput mask={mask ?? ''} {...maskProps}/>
    </Field>
  )
}

export default TextInput