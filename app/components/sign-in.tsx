import { handleAuth } from '../actions/handle-auth'

export default function SignIn() {
  return (
    <form action={handleAuth}>
      <button type="submit" className="border p-2 rounded-md cursor-pointer">
        Signin with Google
      </button>
    </form>
  )
}
