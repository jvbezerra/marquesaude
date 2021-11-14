import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Icon from '@mui/material/Icon'
import { styled } from '@mui/material/styles'

interface Props {
  title: string,
}

const CustomAccordion = styled((props: AccordionProps) => (
  <MuiAccordion elevation={0} {...props} />
))(({
  border: 'none'
}))

const Accordion: React.FC<Props> = (props) => {
  return (
    <CustomAccordion disableGutters TransitionProps={{ unmountOnExit: true }}>
      <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
        <Typography>{props.title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ height: '200px' }}>
        {props.children}
      </AccordionDetails>
    </CustomAccordion>
  )
}

export default Accordion