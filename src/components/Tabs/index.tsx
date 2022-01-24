import { styled } from '@mui/material/styles'
import MuiTabs, { TabsProps } from '@mui/material/Tabs'
import MuiTab, { TabProps } from '@mui/material/Tab'
import colors from '../../styles/colors';

export const Tabs = styled((props: TabsProps) => (
  <MuiTabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  width: '100%',
  marginBottom: 30,
  '& .MuiTabs-flexContainer': {
    justifyContent: 'space-around',
  },
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    width: '100%',
    backgroundColor: colors.blue,
  },
})

export const Tab = styled((props: TabProps) => (
  <MuiTab disableRipple {...props} />
))({
  textTransform: 'none',
  fontSize: '16px',
  color: '#000',
  '&.Mui-selected': {
    color: '#000',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
})