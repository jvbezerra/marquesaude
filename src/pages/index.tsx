import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/client'
// @ts-ignore
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { UsersSchema } from '../services/usersSchema'
import logo from '../../public/logo.png'
import Button from '../components/Button'
import TextInput from '../components/Inputs/Input'
import style from '../styles/Login.module.scss'
import { Tab, Tabs } from '../components/Tabs'
import Loading from '../components/Loading'

export default function Login() {
  const userTypes = Object.values(UsersSchema)
  const [tab, setTab] = useState(0)
  const [loading, setLoading] = useState(false)
  const { handleSubmit, control, formState: { errors } } = useForm<any>({
    resolver: yupResolver(userTypes[tab].validationSchema)
  })

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const error = urlParams.get('error')
    
    if (error) toast.error(error)
  }, [])

  const onSubmit = async (values: any) => {
    setLoading(true)
    signIn(
      'credentials',
      {
        key: values.key.replace(/( )+/g, ""),
        password: values.password,
        callbackUrl: '/dashboard'
      }
    )
  }

  return (
    <div className={style.container}>
      <form className={style.login} onSubmit={handleSubmit(onSubmit)}>
        <Image src={logo} width={256} height={104} alt="Marque Saúde" placeholder="blur"/>
        <div style={{ width: '85%' }}>
          <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
            {userTypes.map(type => (
              <Tab key={type.label} label={type.label} />
            ))}
          </Tabs>
          <TextInput
            name="key"
            label={userTypes[tab].key}
            placeholder={userTypes[tab].placeholder}
            mask={userTypes[tab].mask}
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