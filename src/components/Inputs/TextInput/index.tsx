import InputMask from "react-input-mask"
import styled from "styled-components"
import Field, {InputProps, inputStyle} from "../Field"

const StyledInput = styled(InputMask)<InputProps>`
  ${inputStyle}
  border: ${props => props.error ? '1px solid red' : '1px solid #C1C3CF'};
`
const TextInput = (props: InputProps) => (
  <Field label={props.label ?? ''} error={props.error ?? ''}>
    <StyledInput mask={props.mask ?? ''} {...props}/>
  </Field>
)

export default TextInput