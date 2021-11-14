import { Controller, Control} from "react-hook-form"
import Field, { FieldProps } from "../BaseField"

interface Props extends FieldProps {
  control: Control<any>
}

const TextInput = (props: Props) => {
  const { name, control, ...inputProps } = props
  return (
    <Controller
      name={name!}
      defaultValue={false}
      rules={{ required: true, min: 5 }}
      control={control}
      render={({ field }) => <Field {...field} {...inputProps} />}
    />
  )
}

export default TextInput