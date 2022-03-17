import React from 'react'
import Typography from '@mui/material/Typography'
import styled from '@emotion/styled'

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'capture'>
export interface FieldProps extends InputProps {
  mask?: string
  label?: string
  error?: string[] | any
}

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

export default Field