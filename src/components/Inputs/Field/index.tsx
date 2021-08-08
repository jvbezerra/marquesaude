import styled from 'styled-components'

interface FieldProps {
  label: string
  error: string
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  mask?: string
  label?: string
  error?: string[] | any
}

export const inputStyle = `
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border-radius: 8px;
  width: 100%;
  height: 5.5vh;
  padding: 2% 4% 2% 4%;
  color: #142032;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-bottom: 15px;
`

const ErrorLabel = styled.label`
  align-self: end;
  font-size: 12px;
  color: red;
`

const Field: React.FC<FieldProps> = (props) => (
  <Container>
    <label>{props.label}</label>
    {props.children}
    <ErrorLabel>{props.error}</ErrorLabel>
  </Container>
)

export default Field