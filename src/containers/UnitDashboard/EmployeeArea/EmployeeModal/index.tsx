import useSWR, { useSWRConfig } from 'swr'
import { useSession } from 'next-auth/client'
import * as yup from 'yup'

import FormModal from '../../../../components/FormModal'
import TextInput from '../../../../components/Inputs/TextInput'
import { EmployeeService } from '../../../../services'
import RequestList from '../RequestList'

import Grid from '@mui/material/Grid'
import SelectInput from '../../../../components/Inputs/SelectInput'
import SelectItem from '@mui/material/MenuItem'

interface Props {
  employee: Employee | null
  isOpen: boolean
  onClose: Function
}

const validationSchema = yup.object().shape({
  name: yup.string()
    .required("Obrigatório"),
  roleId: yup.number()
    .required("Obrigatório"),
  professional_record: yup.string(),
  cpf: yup.string()
    .min(14, "Inválido"),
  vacancies: yup.number()
    .required(),
})

const EmployeeModal: React.FC<Props> = (props) => {
  const { employee, isOpen, onClose } = props
  const { mutate } = useSWRConfig()
  const [ session ] = useSession()
  const { data: rolesOptions } = useSWR<EmployeeRole[]>(`/employees/roles`)

  const addEmployee = async (values: Employee) => {
    mutate(`/employees/unit/${session!.unit!.id}`, async (employees: Employee[]) => {
      const newEmployee = await EmployeeService.create({
        ...values,
        available: false,
        unitId: session!.unit!.id
      })
    
      return [...employees, newEmployee]
    }).then(() => onClose())
  }

  const updateEmployee = (values: Partial<Employee>) => {
    mutate(`/employees/unit/${session!.unit!.id}`, async (employees: Employee[]) => {
      const updatedEmployee = EmployeeService.edit(employee?.id!, values)

      const filteredEmployees = employees.filter(item => item.id !== employee?.id!)
      return [...filteredEmployees, updatedEmployee]
    }).then(() => onClose())
  }

  return (
    <FormModal
      title="Profissional"
      isOpen={isOpen}
      onClose={onClose}
      onAdd={(values: Employee) => addEmployee(values)}
      onEdit={(values: Employee) => updateEmployee(values)}
      validationSchema={validationSchema}
      defaultValues={employee}
    >
      {({ formState: { errors }, control }) => (
        <>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextInput
                label="Nome"
                name="name"
                placeholder="Insira o nome do profissional"
                error={errors.name?.message}
                control={control}
              />
            </Grid>
            <Grid item xs={6}>
              <SelectInput
                label="Tipo"
                name="roleId"
                control={control}
              >
                {rolesOptions?.map(role => (
                  <SelectItem value={role.id}>{role.name}</SelectItem>
                ))}
              </SelectInput>
            </Grid>
          </Grid>
          <TextInput
            label="CPF"
            name="cpf"
            mask="999.999.999-99"
            placeholder="123.456.789-10"
            error={errors.cpf?.message}
            control={control}
          />
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextInput
                label="Registro em CR"
                name="professional_record"
                placeholder="Insira o número de registro"
                error={errors.professional_record?.message}
                control={control}
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                label="Vagas/dia"
                name="vacancies"
                type="number"
                error={errors.vacancies?.message}
                control={control}
              />
            </Grid>
          </Grid>

          {employee?.Appointments && employee?.Appointments.length > 0
            ? <RequestList appointments={employee?.Appointments}/>
            : <></>
          }
        </>
      )}
    </FormModal>
  )
}

export default EmployeeModal