import Button from '../Button'
import * as yup from 'yup'
import { useState } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Loading from '../Loading'

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
  const [loading, setLoading] = useState(false)
  const [isViewing, setIsViewing] = useState<boolean>(!!defaultValues)
  const formProps = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema!),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  })

  const switchSubmission = (values: any) => {
    setLoading(true)
    if (!!defaultValues) {
      onEdit(values)
    } else {
      onAdd(values)
    }
  }

  return (
    <Dialog TransitionProps={{ unmountOnExit: true }} open={isOpen} onClose={() => onClose()}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <form onSubmit={formProps.handleSubmit(switchSubmission)}>
          <fieldset
            disabled={isViewing || loading}
            style={{ border: 'none', padding: 'unset' }}
          >
            {props.children(formProps)}
          </fieldset>

          {isViewing &&
            <Button
              onClick={() => setIsViewing(false)}
              secondary
              type="button"
              style={{ width: '50%', marginTop: 15 }}
            >
              {loading ? <Loading size={25}/> : 'Editar'}
            </Button>
          }
          {!isViewing &&
            <Button
              type="submit"
              style={{ width: '50%', marginTop: 15 }}
            >
              {loading ? <Loading color="inherit" size={25}/> : 'Confirmar'}
            </Button>
          }
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default FormModal