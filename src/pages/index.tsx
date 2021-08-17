import { Form, Formik } from 'formik'
import Image from 'next/image'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import * as yup from 'yup'

import logo from '../../public/logo.png'
import Button from '../components/Button'
import TextInput from '../components/Inputs/TextInput'
import { AuthContext } from '../contexts/auth'
import style from '../styles/Login.module.scss'
import { signIn } from '../services'

const validationSchema = yup.object().shape({
  cnes: yup.string()
    .required('Obrigatório')
    .min(7, "Inválido"),
  password: yup.string()
    .required('Obrigatório'),
})

export default function Login() {
  const router = useRouter()
  const { unit, logIn } = useContext(AuthContext)

  useEffect(() => {
    if (unit) router.push('/dashboard')
  }, [unit])

  const handleSubmit = async (values: any) => {
    const signUnit = await signIn(values.cnes, values.password)
    logIn(signUnit)
  }

  return (
    <div className={style.container}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          cnes: '',
          password: '',
        }}
        validateOnChange={false}
        onSubmit={values => handleSubmit(values)}
      >
        {({ values, errors, handleChange, submitForm }) => (
          <Form className={style.login}>
            <Image src={logo} width={256} height={104} alt="Marque Saúde" placeholder="blur"/>
            <div style={{ width: '85%' }}>
              <TextInput
                name="cnes"
                label="CNES"
                placeholder="Insira o número do CNES"
                value={values.cnes}
                error={errors.cnes}
                onChange={handleChange}
              />
              <TextInput
                label="Senha"
                type="password"
                name="password"
                placeholder="Insira a senha para acesso"
                value={values.password}
                error={errors.password}
                onChange={handleChange}
              />
            </div>
            <Button onClick={submitForm} style={{ width: '50%' }}>
              Entrar
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
