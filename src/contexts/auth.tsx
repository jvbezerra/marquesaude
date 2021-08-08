import { useState, createContext, useCallback } from "react"

interface ContextProps {
  unit: Unit | null,
  logIn: Function,
  logOut: Function
}

export const AuthContext = createContext({} as ContextProps)

const AuthProvider: React.FC = ({ children }) => {
  const [unit, setUnit] = useState<Unit | null>(null)

  const logIn = useCallback((data: Unit) => {
    setUnit(data)
  }, [])

  const logOut = useCallback(() => {
    setUnit(null)
  }, [])

  return (
    <AuthContext.Provider value={{ unit, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider