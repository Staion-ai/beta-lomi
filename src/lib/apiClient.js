// API client with automatic token handling
import { getAuthHeader, getRefreshToken, shouldRefreshToken, clearAuthData } from './tokenStorage'
import { refreshToken } from './index'
import { base_api_url, base_auth_url } from '../constants'

/**
 * Enhanced fetch wrapper with automatic token handling
 */
export const apiClient = async (url, options = {}) => {
  let headers = {
    'Content-Type': 'application/json',
    ...options.headers
  }

  // Add authorization header if available
  const authHeader = getAuthHeader()
  if (authHeader.Authorization) {
    headers = { ...headers, ...authHeader }
  }

  // Check if token needs refresh before making the request
  if (shouldRefreshToken()) {
    try {
      const refreshTokenValue = getRefreshToken()
      if (refreshTokenValue) {
        const refreshResponse = await refreshToken(refreshTokenValue)
        if (refreshResponse.access) {
          localStorage.setItem('lomi_access_token', refreshResponse.access)
          // Update headers with new token
          headers.Authorization = `Bearer ${refreshResponse.access}`
        }
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
      // Continue with the request, it might fail but we'll handle it below
    }
  }

  const response = await fetch(url, {
    ...options,
    headers
  })

  // Handle 401 Unauthorized - token might be expired
  if (response.status === 401) {
    // Try to refresh token one more time
    const refreshTokenValue = getRefreshToken()
    if (refreshTokenValue) {
      try {
        const refreshResponse = await refreshToken(refreshTokenValue)
        if (refreshResponse.access) {
          localStorage.setItem('lomi_access_token', refreshResponse.access)
          
          // Retry the original request with new token
          const retryResponse = await fetch(url, {
            ...options,
            headers: {
              ...headers,
              Authorization: `Bearer ${refreshResponse.access}`
            }
          })
          
          return retryResponse
        }
      } catch (refreshError) {
        console.error('Token refresh failed on 401:', refreshError)
        // Clear auth data if refresh fails
        clearAuthData()
        throw new Error('Session expired. Please login again.')
      }
    } else {
      // No refresh token available
      clearAuthData()
      throw new Error('Session expired. Please login again.')
    }
  }

  return response
}

/**
 * API client specifically for authenticated requests to the main API
 */
export const authenticatedApiRequest = async (endpoint, options = {}) => {
  const url = `${base_api_url}${endpoint}`
  return apiClient(url, options)
}

/**
 * API client for auth-related requests
 */
export const authApiRequest = async (endpoint, options = {}) => {
  const url = `${base_auth_url}${endpoint}`
  return apiClient(url, options)
}