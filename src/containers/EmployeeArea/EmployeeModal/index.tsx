import { toast } from 'react-toastify'
import * as yup from 'yup'

import FormModal from '../../../components/FormModal'
import TextInput from '../../../components/Inputs/TextInput'
import { createEmployee, editEmployee } from '../../../services'
import RequestList from '../RequestList'

import Grid from '@mui/material/Grid'
import SelectInput from '../../../components/Inputs/SelectInput'
import SelectItem from '@mui/material/MenuItem'

interface Props {
  unitId: number
  employee: Employee | null
  isOpen: boolean
  onClose: Function
  mutate: any
}

const validationSchema = yup.object().shape({
  name: yup.string()
    .required("Obrigatório"),
  role: yup.string()
    .required("Obrigatório"),
  professional_record: yup.string(),
  cpf: yup.string()
    .min(14, "Inválido"),
  vacancies: yup.number()
    .required(),
})

const doctorTypes = ["Psicólogo(a)", "Dentista", "Clínico(a) Geral"]

const EmployeeModal: React.FC<Props> = (props) => {
  const { employee, isOpen, onClose, unitId, mutate } = props

  const addEmployee = async (values: Employee) => {
    createEmployee({
      ...values,
      available: false,
      unitId
    })
      .then(res => {
        if (!res) toast.error("Algo deu errado :/")
      })
      .finally(() => {
        mutate()
        onClose()
      })
  }

  const changeEmployee = (values: Employee | any) => {
    editEmployee(employee?.id!, values)
      .then(res => {
        if (!res) toast.error("Algo deu errado :/")
      })
      .finally(() => {
        mutate()
        onClose()
      })
  }

  return (
    <FormModal
      title="Profissional"
      isEdit={!!employee}
      isOpen={isOpen}
      onClose={() => onClose()}
      onAdd={(values: Employee) => addEmployee(values)}
      onEdit={(values: Employee) => changeEmployee(values)}
      validationSchema={validationSchema}
      initialValues={{
        name: employee?.name ?? '',
        role: employee?.role ?? '',
        cpf: employee?.cpf ?? '',
        professional_record: employee?.professional_record ?? '',
        vacancies: employee?.vacancies ?? 0,
      }}
    >
      {({ setValue, formState: { errors }, watch }) => {
        const values = watch()
        return (
          <>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextInput
                  label="Nome"
                  placeholder="Insira o nome do profissional"
                  error={errors.name?.message}
                  value={values?.name}
                  onChange={({ target }) => setValue('name', target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectInput
                  label="Tipo"
                  defaultValue={values?.role}
                  onChange={value => setValue("role", value)}
                >
                  {doctorTypes.map(type => (
                    <SelectItem value={type}>{type}</SelectItem>
                  ))}
                </SelectInput>
              </Grid>
            </Grid>
            <TextInput
              label="CPF"
              mask="999.999.999-99"
              placeholder="123.456.789-10"
              value={values?.cpf}
              error={errors.cpf?.message}
              onChange={({ target }) => setValue('cpf', target.value)}
            />
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextInput
                  label="Registro em CR"
                  placeholder="Insira o número de registro"
                  error={errors.professional_record?.message}
                  value={values?.professional_record}
                  onChange={({ target }) => setValue('professional_record', target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextInput
                  label="Vagas/dia"
                  type="number"
                  error={errors.vacancies?.message}
                  value={values?.vacancies}
                  onChange={({ target }) => setValue('vacancies', target.value)}
                />
              </Grid>
            </Grid>

            {employee?.appointments && employee?.appointments.length > 0
              ? <RequestList appointments={employee?.appointments}/>
              : <></>
            }
          </>
        )
      }}
    </FormModal>
  )
}

export default EmployeeModal