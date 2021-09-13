import { Modal } from 'antd'
import Button from '../Button'
import * as yup from 'yup'
import { useEffect, useState, useRef } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

interface Props {
  title: string
  isEdit: boolean
  isOpen: boolean
  onClose: Function
  onAdd: Function
  onEdit: Function
  initialValues: any
  validationSchema?: yup.ObjectSchema<any>
  children: (form: UseFormReturn<any, object>) => JSX.Element
}

const FormModal: React.FC<Props> = (props) => {
  const { isEdit, isOpen, onClose, onAdd, onEdit, validationSchema, initialValues} = props
  const [isEditting, setIsEditting] = useState<boolean>()
  const form: any = useRef()
  const formProps = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema!)
  })

  useEffect(() => setIsEditting(isEdit), [isEdit])

  const onSubmit = (values: typeof props.initialValues) => {
    if (isEdit) {
      onEdit(values)
    } else {
      onAdd(values)
    }
  }

  return (
    <Modal
      title={props.title}
      visible={isOpen}
      onCancel={() => onClose()}
      destroyOnClose
      footer={null}
    >
      <form onSubmit={formProps.handleSubmit(onSubmit)} ref={form}>
        <fieldset disabled={isEditting}>
          {props.children(formProps)}
        </fieldset>
        
        <Button
          onClick={() => isEditting ? setIsEditting(false) : form.submit()}
          secondary={isEditting}
          style={{ width: '50%', marginTop: 15 }}
        >
          {isEditting ? 'Editar' : 'Confirmar'}
        </Button>
      </form>
    </Modal>
  )
}

export default FormModal