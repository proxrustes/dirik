'use client'

import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <>
      <Button type="button" onClick={() => router.push('/login')}>
        login
      </Button>
      <Button type="button" onClick={() => router.push('/register')}>
        reg
      </Button>

    </>

  )
}
