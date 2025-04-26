import { handleAuth } from '../actions/handle-auth'

export default function SignOut() {
  return (
    <form action={handleAuth}>
      <button type="submit" className="border p-2 rounded-md cursor-pointer">
        Logout
      </button>
    </form>
  )
}
