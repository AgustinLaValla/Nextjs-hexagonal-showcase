import React from 'react'
import { Layout, Login } from '@/presentation/components'

export default function LoginPage() {
  return (
    <Layout authButtonLabel='Login'>
      <Login />
    </Layout>
  )
}
