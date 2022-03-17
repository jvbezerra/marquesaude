import CircularProgress, { CircularProgressProps } from "@mui/material/CircularProgress"
import styled from '@emotion/styled'

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`

const Loading = (props: CircularProgressProps) => (
  <LoaderContainer>
    <CircularProgress {...props}/>
  </LoaderContainer>
)

export default Loading