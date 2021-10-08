import Button from '../Button'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import { useForm, UseFormReturn, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

interface Props {
  title: string
  isOpen: boolean
  onClose: Function
  onAdd: (props: any) => void
  onEdit: (props: any) => void
  defaultValues: any
  validationSchema?: yup.ObjectSchema<any>
  children: (form: UseFormReturn<any, object>) => JSX.Element
}

const FormModal: React.FC<Props> = (props) => {
  const { isOpen, onClose, onAdd, onEdit, validationSchema, defaultValues } = props
  const [isEditting, setIsEditting] = useState<boolean>()
  const formProps = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema!),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  })

  useEffect(() => setIsEditting(!!defaultValues), [defaultValues])
  const switchSubmission = (values: any) => {
    if (isEditting) {
      onEdit(values)
    } else {
      onAdd(values)
    }
  }

  return (
    <Dialog keepMounted open={isOpen} onClose={() => onClose()}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <form onSubmit={formProps.handleSubmit(switchSubmission)}>
          <fieldset disabled={isEditting} style={{ border: 'none', padding: 'unset' }}>
            {props.children(formProps)}
          </fieldset>

          {isEditting &&
            <Button
              onClick={() => setIsEditting(false)}
              secondary
              type="button"
              style={{ width: '50%', marginTop: 15 }}
            >
              Editar
            </Button>
          }
          {!isEditting &&
            <Button
              type="submit"
              style={{ width: '50%', marginTop: 15 }}
            >
              Confirmar
            </Button>
          }
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default FormModal