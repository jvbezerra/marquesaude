import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/client'
// @ts-ignore
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { UsersSchema } from '../lib/usersSchema'
import logo from '../../public/logo.png'
import Button from '../components/Button'
import TextInput from '../components/Inputs/Input'
import style from '../styles/Login.module.scss'
import { Tab, Tabs } from '../components/Tabs'
import Loading from '../components/Loading'

type FormProps = { key: string, password: string }

export default function Login() {
  const [type, setType] = useState('citizen')
  const selectedType = UsersSchema[type]
  const [loading, setLoading] = useState(false)
  const { handleSubmit, control, formState: { errors } } = useForm<FormProps>({
    resolver: yupResolver(selectedType.validationSchema),
    defaultValues: { key: '', password: '' }
  })

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const error = urlParams.get('error')
    
    if (error) toast.error(error)
  }, [])

  const onSubmit = async ({ key, password }: FormProps) => {
    setLoading(true)
    signIn(
      'credentials',
      { key: key.replace(/\s/g,''), type, password, callbackUrl: '/dashboard' }
    )
  }

  return (
    <div className={style.container}>
      <form className={style.login} onSubmit={handleSubmit(onSubmit)}>
        <Image src={logo} width={256} height={104} alt="Marque Saúde" placeholder="blur"/>
        <div style={{ width: '85%' }}>
          <Tabs value={type} onChange={(_, newValue) => setType(newValue)}>
            {Object.entries(UsersSchema).map(([key, { label }]) => (
              <Tab key={key} value={key} label={label} />
            ))}
          </Tabs>
          <TextInput
            name="key"
            label={selectedType.key}
            placeholder={selectedType.placeholder}
            mask={selectedType.mask}
            control={control}
            error={errors.key?.message}
          />
          <TextInput
            name="password"
            label="Senha"
            placeholder="Insira a senha para acesso"
            type="password"
            control={control}
            error={errors.password?.message}
          />
        </div>
        <Button type="submit" style={{ width: '50%' }} disabled={loading}>
          {loading ? <Loading color="inherit" size={25}/> : 'Entrar'}
        </Button>
      </form>
    </div>
  )
}