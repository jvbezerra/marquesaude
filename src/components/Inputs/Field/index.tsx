import Typography from '@mui/material/Typography'
import styled from 'styled-components'

interface FieldProps {
  label: string
  error: string
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  mask?: string
  label?: string
  error?: string[] | any
  ref?: any
}

export const inputStyle = `
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border-radius: 8px;
  width: 100%;
  height: 5vh !important;
  min-height: 40px;
  padding: 2% 5%;
  box-sizing: border-box;
  color: #142032;

  @media (max-height: 500px) {
    box-sizing: content-box;
  }
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
    <Typography variant="subtitle2" style={{ whiteSpace: 'nowrap' }}>{props.label}</Typography>
    {props.children}
    <ErrorLabel>{props.error}</ErrorLabel>
  </Container>
)

export default Field