import SignOut from '@/app/components/sign-out'
import { auth } from '@/app/lib/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-2">
      <h1 className="text-5xl">Protected dashboard</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>

      {session.user?.email && <SignOut />}

      <Link href="/payments">Pagamentos</Link>
    </div>
  )
}
