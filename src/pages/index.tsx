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
import { Tab, Tabs } from '../components/Tabs'

const userTypes = [
  {
    label: 'Cidadão',
    key: 'Cartão do SUS',
    placeholder: 'Insira o número do cartão do SUS',
    mask: '999 9999 9999 9999',
    validationSchema: yup.object().shape({
      key: yup.string()
        .required('Obrigatório')
        .min(15, "Inválido"),
      password: yup.string()
        .required('Obrigatório'),
    }),
  },
  {
    label: 'Unidade',
    key: 'CNES',
    placeholder: 'Insira o número do CNES',
    mask: '9999999',
    validationSchema: yup.object().shape({
      key: yup.string()
        .required('Obrigatório')
        .min(7, "Inválido"),
      password: yup.string()
        .required('Obrigatório'),
    }),
  },
]

export default function Login() {
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false)
  const { handleSubmit, control, formState: { errors } } = useForm<any>({
    resolver: yupResolver(userTypes[tab].validationSchema)
  });

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

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
          <Tabs value={tab} onChange={handleChange}>
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
          {loading ? <Spin/> : 'Entrar'}
        </Button>
      </form>
    </div>
  )
}