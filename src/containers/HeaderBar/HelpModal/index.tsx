import { Modal } from 'antd'
import Image from 'next/image'
import HelpImage from '../../../../public/ms-help.jpg'

interface Props {
  isOpen: boolean
  onClose: Function
}

const HelpModal = (props: Props) => (
  <Modal
    title=""
    visible={props.isOpen}
    onCancel={() => props.onClose()}
    footer={null}
  >
    <Image src={HelpImage} alt="Instruções da plataforma" placeholder="blur"/>
  </Modal>
)

export default HelpModal