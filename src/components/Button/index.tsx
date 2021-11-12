import styled from '@emotion/styled'
import colors from '../../styles/colors'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  secondary?: boolean
}

const Button = styled.button<Props>`
  background: ${props => props.secondary ? '#FFF' : colors.blue};
  box-shadow: 0px 4px 8px #00000029;
  padding: 8px;
  border-radius: 50px;
  color: ${props => props.secondary ? colors.darkBlue : '#FFF'};
  width: 100%;
  height: 40px;
  font-size: 16px;
  text-align: center;
  border: ${props => props.secondary ? `1px solid ${colors.darkBlue}` : 'none'};

  :hover {
    background: ${props => props.secondary ? colors.grey : colors.darkBlue}
  }
`

export default Button