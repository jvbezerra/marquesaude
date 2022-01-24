import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = { props: {}, redirect: { destination: '/' } }
  const session = await getSession(context)

  if (session) response.redirect = { destination: `/dashboard/${session.type}` }
  return response
}

export default () => <></>