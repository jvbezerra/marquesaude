import Image from 'next/image'
import { useState } from 'react'
import * as yup from 'yup'
import { signIn } from 'next-auth/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import logo from '../../public/logo.png'
import Button from '../components/Button'
import TextInput from '../components/Inputs/TextInput'
import style from '../styles/Login.module.scss'
import Spin from '@mui/material/CircularProgress'

const validationSchema = yup.object().shape({
  cnes: yup.string()
    .required('Obrigatório')
    .min(7, "Inválido"),
  password: yup.string()
    .required('Obrigatório'),
})

export default function Login() {
  const [loading, setLoading] = useState(false)
  const { handleSubmit, setValue, formState: { errors } } = useForm<any>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (values: any) => {
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
      <form className={style.login} onSubmit={handleSubmit(onSubmit)}>
        <Image src={logo} width={256} height={104} alt="Marque Saúde" placeholder="blur"/>
        <div style={{ width: '85%' }}>
          <TextInput
            name="cnes"
            label="CNES"
            placeholder="Insira o número do CNES"
            onChange={({ target }) => setValue('cnes', target.value)}
            error={errors.cnes?.message}
          />
          <TextInput
            name="passoword"
            label="Senha"
            type="password"
            placeholder="Insira a senha para acesso"
            onChange={({ target }) => setValue('password', target.value)}
            error={errors.password?.message}
          />
        </div>
        <Button type="submit" style={{ width: '50%' }} disabled={loading}>
          {loading ? <Spin/> : 'Entrar'}
        </Button>
      </form>
    </div>
  )
}