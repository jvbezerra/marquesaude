import React from 'react'
import Typography from '@mui/material/Typography'
import InputMask from 'react-input-mask'
import styled from '@emotion/styled'

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'capture'>
export interface FieldProps extends InputProps {
  mask?: string
  label?: string
  error?: string[] | any
}

const StyledInput = styled(InputMask)<FieldProps>`
  background: #FFFFFF;
  border-radius: 8px;
  width: 100%;
  height: 5vh !important;
  min-height: 40px;
  padding: 2% 5%;
  box-sizing: border-box;
  border: ${props => props.error ? '1px solid red' : '1px solid #C1C3CF'};
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-bottom: 15px;
`

export const Field: React.FC<Pick<FieldProps, 'label' | 'error'>> = (props) => (
  <Container>
    <Typography
      variant="subtitle2"
      style={{ whiteSpace: 'nowrap' }}
    >
      {props.label}
    </Typography>
    {props.children}
    <Typography
      variant="subtitle2"
      alignSelf="end"
      color="red"
      fontSize={10}
    >
      {props.error}
    </Typography>
  </Container>
)

const BaseField: React.FC<FieldProps> = React.forwardRef((props, ref?: any) => {
  const { name, label, error, mask, ...inputProps } = props

  return (
    <Field label={label} error={error}>
      <StyledInput
        mask={mask ?? ''}
        ref={ref}
        {...inputProps}
      />
    </Field>
  )
})

export default BaseField