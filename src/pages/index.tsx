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

const validationSchema = yup.object().shape({
  cnpj: yup.string()
    .required('Obrigatório')
    .min(18, "Inválido"),
  password: yup.string()
    .required('Obrigatório'),
})

export default function Login() {
  const router = useRouter()
  const { unit, logIn } = useContext(AuthContext)

  useEffect(() => {
    if (unit) router.push('/dashboard')
  }, [unit])

  const handleSubmit = (values: any) => {
    //encrypt password, send data do api, validate there and if true return data

    logIn({
      id: 14,
      name: 'UBS Padre Malagrida',
      cnpj: '42.839.882/0001-23',
      phone: '83986537368',
      address: {
        street: 'Avenida Campina Grande',
        neighborhood: 'Municípios',
        city: 'Santa Rita'
      }
    })
  }

  return (
    <div className={style.container}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          cnpj: '',
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
                name="cnpj"
                label="CNPJ"
                mask="99.999.999/9999-99"
                placeholder="99.999.999/9999-99"
                value={values.cnpj}
                error={errors.cnpj}
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
