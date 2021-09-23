import { Modal } from 'antd'
import Button from '../Button'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

interface Props {
  title: string
  isEdit: boolean
  isOpen: boolean
  onClose: Function
  onAdd: (props: any) => void
  onEdit: (props: any) => void
  initialValues: any
  validationSchema?: yup.ObjectSchema<any>
  children: (form: UseFormReturn<any, object>) => JSX.Element
}

const FormModal: React.FC<Props> = (props) => {
  const { isEdit, isOpen, onClose, onAdd, onEdit, validationSchema, initialValues} = props
  const [isEditting, setIsEditting] = useState<boolean>()
  const formProps = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema!)
  })

  useEffect(() => setIsEditting(isEdit), [isEdit])

  return (
    <Modal
      title={props.title}
      visible={isOpen}
      onCancel={() => onClose()}
      destroyOnClose
      footer={null}
    >
      <form onSubmit={formProps.handleSubmit(isEdit ? onEdit : onAdd)}>
        <fieldset disabled={isEditting}>
          {props.children(formProps)}
        </fieldset>
        
        {isEditting
        ? (
          <Button
            type="submit"
            style={{ width: '50%', marginTop: 15 }}
          >
            Confirmar
          </Button>
        ) : (
          <Button
            onClick={() => setIsEditting(true)}
            secondary
            style={{ width: '50%', marginTop: 15 }}
          >
            Editar
          </Button>
        )
        }
      </form>
    </Modal>
  )
}

export default FormModal