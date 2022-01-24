import useSWR, { KeyedMutator } from 'swr'
import { useSession } from 'next-auth/client'
import * as yup from 'yup'

import FormModal from '../../../FormModal'
import TextInput from '../../../Inputs/Input'

import Grid from '@mui/material/Grid'
import SelectInput from '../../../Inputs/Select'
import SelectItem from '@mui/material/MenuItem'
import Accordion from '../../../Accordion'
import HoursList from './HoursList'
import useAPI from '../../../../hooks/useAPI'

interface Props {
  employee: Employee | null
  isOpen: boolean
  onClose: Function
  mutate: KeyedMutator<Employee[]>
}

const validationSchema = yup.object().shape({
  name: yup.string()
    .required("Obrigatório"),
  roleId: yup.number()
    .required("Obrigatório"),
  professionalRecord: yup.string(),
  cpf: yup.string()
    .min(14, "Inválido"),
})

const EmployeeModal: React.FC<Props> = ({ employee, mutate, isOpen, onClose }) => {
  const [ session ] = useSession()
  const { data: rolesOptions } = useSWR<EmployeeRole[]>('/roles')
  const EmployeeService = useAPI<Employee>('employees')

  const addEmployee = async (values: Employee) => {
    mutate(async (employees: Employee[] = []) => {
      const { hours, ...data } = values
      const newEmployee = await EmployeeService.create({
        ...data,
        hours: { create: hours },
        available: false,
        unitId: session!.unit!.id
      })
    
      return [...employees, newEmployee]
    }).then(() => onClose())
  }

  const updateEmployee = (values: Partial<Employee>) => {
    mutate(async (employees: Employee[] = []) => {
      const updatedEmployee = await EmployeeService.edit(employee?.id!, values)

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
      {({ formState: { errors }, control, setValue, watch }) => (
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
                  <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                ))}
              </SelectInput>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextInput
                label="Registro em CR"
                name="professionalRecord"
                placeholder="Insira o número de registro"
                error={errors.professionalRecord?.message}
                control={control}
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                label="CPF"
                name="cpf"
                mask="999.999.999-99"
                placeholder="123.456.789-10"
                error={errors.cpf?.message}
                control={control}
              />
            </Grid>
          </Grid>

          <Accordion title="Horários disponíveis">
            <HoursList
              employeeHours={watch('hours')}
              handleSubmit={hours => setValue('hours', hours)}
            />
          </Accordion>
        </>
      )}
    </FormModal>
  )
}

export default EmployeeModal