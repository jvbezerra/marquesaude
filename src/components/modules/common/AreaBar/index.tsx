import { Divider } from '@mui/material'
import Typography from '@mui/material/Typography'
import styled from '@emotion/styled'

interface Props {
  title: string,
  actions: React.ReactNode[]
}

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`

const Header: React.FC<Props> = ({ title, actions }) => (
  <>
    <HeaderDiv>
      <Typography variant="h6">{title}</Typography>
      <div>{actions}</div>
    </HeaderDiv>
    <Divider/>
  </>
)

export default Header