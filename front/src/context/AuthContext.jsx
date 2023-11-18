import { createContext, useState, useEffect, useContext } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import axios from 'axios'

const AuthContext = createContext()

export function useAuthContext() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState('')

  const authApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      Authorization: `Bearer ${user && user.accessToken}`,
    },
  })

  const value = {
    user,
    authApi,
  }

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      console.info(user)
      setUser(user)
    })
    return () => {
      unsubscribed()
    }
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
