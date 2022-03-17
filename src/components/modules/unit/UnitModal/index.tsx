import Grid from '@mui/material/Grid'
import * as yup from 'yup'
import FormModal from '../../common/FormModal'
import TextInput from '../../common/Input'

interface Props {
  unit: Unit
  isOpen: boolean
  onClose: Function
}

const validationSchema = yup.object().shape({
  name: yup.string()
    .required("Obrigatório"),
  cnes: yup.string()
    .required('Obrigatório')
    .min(7, "Inválido"),
  phonenumber: yup.string()
    .required()
    .min(14, "Inválido"),
  password: yup.string(),
  street: yup.string()
    .required("Obrigatório"),
  neighborhood: yup.string()
    .required("Obrigatório"),
  city: yup.string()
    .required("Obrigatório"),
})

const UnitModal: React.FC<Props> = ({ unit, isOpen, onClose }) => {
  return (
    <FormModal
      title="Unidade"
      isOpen={isOpen}
      onClose={onClose}
      onAdd={() => {}}
      onEdit={(values: Unit) => {}}
      validationSchema={validationSchema}
      defaultValues={unit}
    >
      {({ formState: { errors }, control }) => (
        <>
          <TextInput
            label="Nome"
            name="name"
            error={errors.name?.message}
            control={control}
          />
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextInput
                label="CNES"
                name="cnes"
                disabled
                mask="9999999"
                error={errors.cnes?.message}
                control={control}
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                label="Celular"
                name="phonenumber"
                mask={"(99) 99999-9999"}
                error={errors.phonenumber?.message}
                control={control}
              />
            </Grid>
          </Grid>
          <TextInput
            label="Alterar senha"
            name="passoword"
            type="password"
            placeholder="Insira a senha para mudança"
            error={errors.password?.message}
            control={control}
          />
          <TextInput
            label="Endereço"
            name="street"
            error={errors.street?.message}
            control={control}
          />
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextInput
                label="Bairro"
                name="neighborhood"
                error={errors.neighborhood?.message}
                control={control}
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                label="Cidade"
                name="city"
                error={errors.city?.message}
                control={control}
              />
            </Grid>
          </Grid>
        </>
      )}
    </FormModal>
  )
}

export default UnitModal