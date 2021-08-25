import { Form, Formik } from 'formik'
import Image from 'next/image'
import { useState } from 'react'
import * as yup from 'yup'
import { signIn } from 'next-auth/client'

import logo from '../../public/logo.png'
import Button from '../components/Button'
import TextInput from '../components/Inputs/TextInput'
import style from '../styles/Login.module.scss'
import { Spin } from 'antd'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
const LoadingIcon = <LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />;

const validationSchema = yup.object().shape({
  cnes: yup.string()
    .required('Obrigatório')
    .min(7, "Inválido"),
  password: yup.string()
    .required('Obrigatório'),
})

export default function Login() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: any) => {
    setLoading(true)
    signIn(
      'credentials',
      { ...values, 
        callbackUrl: '/dashboard'
      }
    )
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
            <Button onClick={submitForm} style={{ width: '50%' }} disabled={loading}>
              {loading ? <Spin indicator={LoadingIcon}/> : 'Entrar'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
