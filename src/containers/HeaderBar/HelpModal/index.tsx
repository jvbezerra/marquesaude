import Dialog from '@mui/material/Dialog'
import Image from 'next/image'
import HelpImage from '../../../../public/ms-help.jpg'

interface Props {
  isOpen: boolean
  onClose: Function
}

const HelpModal = (props: Props) => (
  <Dialog open={props.isOpen} onClose={() => props.onClose()}>
    <Image src={HelpImage} alt="Instruções da plataforma" placeholder="blur"/>
  </Dialog>
)

export default HelpModal