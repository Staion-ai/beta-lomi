import React, { createContext, useState, useEffect } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar si hay un usuario autenticado en localStorage al cargar la app
    const savedAuth = localStorage.getItem('lomi_auth')
    const savedUser = localStorage.getItem('lomi_user')
    
    if (savedAuth === 'true' && savedUser) {
      setIsAuthenticated(true)
      setUser(JSON.parse(savedUser))
    }
    
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      setLoading(true)
      
      // Simulación de llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Validación simple para demo
      if (email === 'admin@lomi.com' && password === 'admin123') {
        const userData = {
          email: email,
          name: 'Administrador LOMI',
          role: 'admin'
        }
        
        setIsAuthenticated(true)
        setUser(userData)
        
        // Guardar en localStorage
        localStorage.setItem('lomi_auth', 'true')
        localStorage.setItem('lomi_user', JSON.stringify(userData))
        
        return { success: true }
      } else {
        return { 
          success: false, 
          error: 'Credenciales incorrectas. Use admin@lomi.com / admin123' 
        }
      }
    } catch {
      return { 
        success: false, 
        error: 'Error de conexión. Intente nuevamente.' 
      }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('lomi_auth')
    localStorage.removeItem('lomi_user')
  }

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext