import { GetServerSideProps } from 'next'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/client'
import HeaderBar from '../components/HeaderBar'
import { UsersSchema } from '../services/usersSchema'

const Dashboard = (props: { session: Session }) => {
  const Container = UsersSchema[props.session.type].dashboard
  return (
    <>
      <HeaderBar/>
      <Container/>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  
  if (session) {
    return {
      props: { session }
    }
  }

  return {
    props: {},
    redirect: { destination: '/' }
  }
}

export default Dashboard