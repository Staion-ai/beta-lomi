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

    if (!authResponse || typeof authResponse !== 'object') {
      throw new Error('No valid authentication response provided')
    }

    // Direct extraction without normalization first
    const access = authResponse.access
    const refresh = authResponse.refresh
    const user = authResponse.user

    // Specific validation with detailed error messages
    if (!access || access.trim() === '') {
      throw new Error(`Invalid access token: ${JSON.stringify(access)}`)
    }

    // Special handling for refresh token - might be empty in some login responses
    if (!refresh || refresh.trim() === '') {
      console.warn('Refresh token is empty or missing. This might be a backend configuration issue.')
      console.warn('Attempting to proceed with access token only. Token refresh will not be available.')

      // For now, let's proceed but note this issue
      // In production, you should fix the backend to return proper refresh tokens
    }

    if (!user || typeof user !== 'object') {
      throw new Error(`Invalid user data: ${JSON.stringify(user)}`)
    }

    // Validate access token format (basic JWT structure check)
    if (typeof access !== 'string' || access.split('.').length !== 3) {
      throw new Error('Invalid access token format - not a valid JWT')
    }

    // Validate refresh token format if present
    if (refresh && refresh.trim() !== '') {
      if (typeof refresh !== 'string' || refresh.split('.').length !== 3) {
        throw new Error('Invalid refresh token format - not a valid JWT')
      }
    }

    // Store tokens
    localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, access)

    // Only store refresh token if it's valid
    if (refresh && refresh.trim() !== '') {
      localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, refresh)
    } else {
      // Clear any existing refresh token
      localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN)
    }

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
  try {
    const accessToken = localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN)
    const refreshToken = getRefreshToken()
    const userData = getStoredUserData()

    // Need at least access token and user data
    // Refresh token is optional (might not be provided by some login endpoints)
    return !!(accessToken && userData)
  } catch (error) {
    console.error('Error checking authentication status:', error)
    return false
  }
}

/**
 * Clear all stored authentication data
 */
export const clearAuthData = () => {
  try {

    // Log what's currently stored before clearing
    Object.entries(TOKEN_KEYS).forEach(([name, key]) => {
      const value = localStorage.getItem(key)
    })

    // Clear all authentication-related data
    Object.values(TOKEN_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })

    // Also clear any other potential auth-related items
    // that might have been stored with different keys
    const authRelatedKeys = Object.keys(localStorage).filter(key =>
      key.startsWith('lomi_') ||
      key.includes('auth') ||
      key.includes('token') ||
      key.includes('user')
    )

    authRelatedKeys.forEach(key => {
      if (!Object.values(TOKEN_KEYS).includes(key)) {
        localStorage.removeItem(key)
      }
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