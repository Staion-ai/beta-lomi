import React, { createContext, useState, useEffect, useCallback } from 'react'
import {
  storeAuthData,
  getStoredUserData,
  isAuthenticated as checkIsAuthenticated,
  clearAuthData,
  getRefreshToken,
  shouldRefreshToken,
  getAccessToken
} from '../lib/tokenStorage'
import { refreshToken } from '../lib'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Token refresh function
  const refreshAccessToken = useCallback(async () => {
    try {
      const refreshTokenValue = getRefreshToken()
      if (!refreshTokenValue) {
        console.warn('No refresh token available - user will need to login again when access token expires')
        throw new Error('No refresh token available')
      }

      const response = await refreshToken(refreshTokenValue)

      if (response.access) {
        // Update only the access token
        localStorage.setItem('lomi_access_token', response.access)
        return response.access
      } else {
        throw new Error('Invalid refresh response')
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
      // If refresh fails, logout user
      clearAuthData()
      setIsAuthenticated(false)
      setUser(null)
      throw error
    }
  }, [])

  // Initialize authentication state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true)

        // Check if user has valid stored authentication
        const authenticated = checkIsAuthenticated()

        if (authenticated) {
          const userData = getStoredUserData()
          setIsAuthenticated(true)
          setUser(userData)

          // Check if token needs refresh (only if refresh token is available)
          const refreshTokenValue = getRefreshToken()
          if (refreshTokenValue && shouldRefreshToken()) {
            try {
              await refreshAccessToken()
            } catch (error) {
              console.error('Failed to refresh token on init:', error)
              // If refresh fails, user will be logged out by refreshAccessToken
            }
          }
        } else {
          setIsAuthenticated(false)
          setUser(null)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        setIsAuthenticated(false)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [refreshAccessToken])

  // Set up token refresh interval
  useEffect(() => {
    if (!isAuthenticated) return

    const interval = setInterval(async () => {
      const refreshTokenValue = getRefreshToken()
      if (refreshTokenValue && shouldRefreshToken()) {
        try {
          await refreshAccessToken()
        } catch (error) {
          console.error('Automatic token refresh failed:', error)
        }
      }
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [isAuthenticated, refreshAccessToken])

  const login = useCallback(async (authResponse) => {
    try {
      setLoading(true)

      // Log the response for debugging
      console.log('Processing login with response:', authResponse)
      console.log('Response type:', typeof authResponse)
      console.log('Response keys:', Object.keys(authResponse || {}))
      console.log('Access token:', authResponse?.access ? 'Present' : 'Missing')
      console.log('Refresh token:', authResponse?.refresh ? 'Present' : 'Missing')
      console.log('User data:', authResponse?.user ? 'Present' : 'Missing')

      // Store the complete auth response (access, refresh, user)
      const stored = storeAuthData(authResponse)

      if (stored) {
        setIsAuthenticated(true)
        setUser(authResponse.user)
        console.log('Login successful, user authenticated')
        return { success: true }
      } else {
        throw new Error('Failed to store authentication data')
      }
    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        error: error.message || 'Error al procesar la autenticación'
      }
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      setLoading(true)

      // Clear all stored auth data
      clearAuthData()

      // Update state
      setIsAuthenticated(false)
      setUser(null)

      return { success: true }
    } catch (error) {
      console.error('Logout error:', error)
      return { success: false, error: 'Error al cerrar sesión' }
    } finally {
      setLoading(false)
    }
  }, [])

  // Get current access token (useful for API calls)
  const getToken = useCallback(() => {
    return getAccessToken()
  }, [])

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    getToken,
    refreshAccessToken
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext