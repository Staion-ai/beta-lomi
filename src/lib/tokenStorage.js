// Secure token storage utilities for JWT authentication

const TOKEN_KEYS = {
  ACCESS_TOKEN: 'lomi_access_token',
  REFRESH_TOKEN: 'lomi_refresh_token',
  USER_DATA: 'lomi_user_data',
  TOKEN_EXPIRES_AT: 'lomi_token_expires_at'
}

/**
 * Decode JWT token to get payload (without verification)
 * Only used for extracting expiration time and basic info
 */
export const decodeJWTPayload = (token) => {
  try {
    if (!token) return null
    const parts = token.split('.')
    if (parts.length !== 3) return null
    
    const payload = JSON.parse(atob(parts[1]))
    return payload
  } catch (error) {
    console.error('Error decoding JWT:', error)
    return null
  }
}

/**
 * Check if token is expired
 */
export const isTokenExpired = (token) => {
  const payload = decodeJWTPayload(token)
  if (!payload || !payload.exp) return true
  
  const now = Math.floor(Date.now() / 1000)
  return payload.exp < now
}

/**
 * Store authentication tokens and user data securely
 */
export const storeAuthData = (authResponse) => {
  try {
    const { access, refresh, user } = authResponse
    
    if (!access || !refresh || !user) {
      throw new Error('Invalid authentication response')
    }

    // Store tokens
    localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, access)
    localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, refresh)
    localStorage.setItem(TOKEN_KEYS.USER_DATA, JSON.stringify(user))
    
    // Calculate and store expiration time
    const payload = decodeJWTPayload(access)
    if (payload && payload.exp) {
      localStorage.setItem(TOKEN_KEYS.TOKEN_EXPIRES_AT, payload.exp.toString())
    }
    
    return true
  } catch (error) {
    console.error('Error storing auth data:', error)
    return false
  }
}

/**
 * Get stored access token
 */
export const getAccessToken = () => {
  try {
    const token = localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN)
    if (!token) return null
    
    // Check if token is expired
    if (isTokenExpired(token)) {
      console.warn('Access token is expired')
      return null
    }
    
    return token
  } catch (error) {
    console.error('Error getting access token:', error)
    return null
  }
}

/**
 * Get stored refresh token
 */
export const getRefreshToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN)
  } catch (error) {
    console.error('Error getting refresh token:', error)
    return null
  }
}

/**
 * Get stored user data
 */
export const getStoredUserData = () => {
  try {
    const userData = localStorage.getItem(TOKEN_KEYS.USER_DATA)
    return userData ? JSON.parse(userData) : null
  } catch (error) {
    console.error('Error getting user data:', error)
    return null
  }
}

/**
 * Check if user is authenticated (has valid tokens)
 */
export const isAuthenticated = () => {
  const accessToken = getAccessToken()
  const refreshToken = getRefreshToken()
  const userData = getStoredUserData()
  
  return !!(accessToken && refreshToken && userData)
}

/**
 * Clear all stored authentication data
 */
export const clearAuthData = () => {
  try {
    Object.values(TOKEN_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
    return true
  } catch (error) {
    console.error('Error clearing auth data:', error)
    return false
  }
}

/**
 * Get authorization header for API requests
 */
export const getAuthHeader = () => {
  const token = getAccessToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

/**
 * Check if access token needs refresh (expires in less than 5 minutes)
 */
export const shouldRefreshToken = () => {
  const token = getAccessToken()
  if (!token) return false
  
  const payload = decodeJWTPayload(token)
  if (!payload || !payload.exp) return false
  
  const now = Math.floor(Date.now() / 1000)
  const expiresIn = payload.exp - now
  
  // Refresh if expires in less than 5 minutes (300 seconds)
  return expiresIn < 300
}