import { Link } from 'react-router-dom'
import { useSignout } from '../hooks/useSignout'
import { useAuth } from '../hooks/useAuth'
import './Navbar.css'
import Temple from '../assets/temple.svg'

export default function Navbar() {
  const { signout, isPending } = useSignout()
  const { user } = useAuth()

  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="dojo logo" />
          <span>The Dashboard</span>
        </li>

        {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}

        {user && (
          <li>
            {!isPending && <button className="btn" onClick={signout}>Logout</button>}
            {isPending && <button className="btn" disabled>Logging out...</button>}
          </li>
        )}
      </ul>
    </nav>
  )
}