import { Modal } from 'antd'
import { Formik, FormikProps } from 'formik'
import Button from '../Button'
import * as yup from 'yup'
import { useEffect, useState } from 'react'

interface Props {
  title: string
  isEdit: boolean
  isOpen: boolean
  onClose: Function
  onAdd: Function
  onEdit: Function
  initialValues: any
  validationSchema?: yup.ObjectSchema<any>
  children: (formik: FormikProps<any>) => JSX.Element
}

const FormModal: React.FC<Props> = (props) => {
  const { isEdit, isOpen, onClose, onAdd, onEdit } = props
  const [isEditting, setIsEditting] = useState<boolean>()

  useEffect(() => setIsEditting(isEdit), [isEdit])

  const handleSubmit = (values: typeof props.initialValues) => {
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
      <Formik
        initialValues={props.initialValues}
        validationSchema={props.validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={values => handleSubmit(values)}
      >
        {formik => (
          <>
            <fieldset disabled={isEditting}>
              {props.children(formik)}
            </fieldset>
            <Button
              onClick={() => isEditting ? setIsEditting(false) : formik.submitForm()}
              secondary={isEditting}
              style={{ width: '50%', marginTop: 15 }}
            >
              {isEditting ? 'Editar' : 'Confirmar'}
            </Button>
          </>
        )}
      </Formik>
    </Modal>
  )
}

export default FormModal