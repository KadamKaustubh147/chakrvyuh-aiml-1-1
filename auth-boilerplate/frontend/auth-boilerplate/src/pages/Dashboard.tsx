import { useContext } from "react"
import { AuthContext } from "../context/AuthContext-http-jwt"

const AppPage = () => {

  const { logout, user } = useContext(AuthContext);

  return (
    <>

      <h1>This should be protected</h1>

      {user && (
        <p>Welcome, {user.email} and {user.name}</p>
      )}

      <button onClick={logout}>Logout</button>
    </>
  )
}

export default AppPage
