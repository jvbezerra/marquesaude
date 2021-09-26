import Button from '../Button'
import * as yup from 'yup'
import { useEffect, useState, useRef } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

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
  const { isEdit, isOpen, onClose, onAdd, onEdit, validationSchema, initialValues } = props
  const [isEditting, setIsEditting] = useState<boolean>()
  const formProps = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema!)
  })

  useEffect(() => setIsEditting(isEdit), [isEdit])
  const onSubmit = (values: any) => {
    if (isEdit) {
      onEdit(values)
    } else {
      onAdd(values)
    }
  }

  return (
    <Dialog keepMounted open={isOpen} onClose={() => onClose()}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <fieldset disabled={isEditting} style={{ border: 'none', padding: 'unset' }}>
          {props.children(formProps)}
        </fieldset>
        <Button
          onClick={() => isEditting ? setIsEditting(false) : onSubmit(formProps.getValues())}
          secondary={isEditting}
          type="button"
          style={{ width: '50%', marginTop: 15 }}
        >
          {isEditting ? 'Editar' : 'Confirmar'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default FormModal