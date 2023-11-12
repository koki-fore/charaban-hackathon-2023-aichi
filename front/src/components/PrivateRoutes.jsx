import { Outlet, Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

function PrivateRoutes() {
  const { user } = useAuthContext()
  return user !== null ? <Outlet /> : <Navigate to="/login" />
}
export default PrivateRoutes
