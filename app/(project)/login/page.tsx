import SignIn from '@/app/components/sign-in'

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-2">
      <h1 className="text-5xl">Login</h1>
      <SignIn />
    </div>
  )
}
