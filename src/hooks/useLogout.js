import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/useAuth'
import { useLogoutUser } from './useLogoutUser'

/**
 * Custom hook that handles the complete logout process
 * Integrates API logout with context cleanup and navigation
 */
export const useLogout = () => {
    const { logout: contextLogout, getToken, loading: authLoading } = useAuth()
    const logoutMutation = useLogoutUser()
    const navigate = useNavigate()

    const logout = useCallback(async (redirectTo = '/login') => {
        try {

            const currentToken = getToken()
            if (currentToken) {
                try {
                    await logoutMutation.mutateAsync({ token: currentToken })
                    localStorage.removeItem('selected_template_id'); // Limpiar selección previa
                    localStorage.removeItem('template_content'); // Limpiar contenido previo
                    localStorage.removeItem('template_form_data'); // Limpiar datos del formulario
                } catch (apiError) {
                    console.warn('Server logout failed, proceeding with local logout:', apiError.message)
                }
            }

            const result = await contextLogout()

            if (result.success) {

                if (redirectTo) {
                    navigate(redirectTo, { replace: true })
                }

                return { success: true }
            } else {
                throw new Error(result.error || 'Failed to complete logout')
            }

        } catch (error) {
            console.error('Logout process error:', error)

            if (redirectTo) {
                navigate(redirectTo, { replace: true })
            }

            return {
                success: false,
                error: error.message || 'Error during logout process'
            }
        }
    }, [contextLogout, getToken, logoutMutation, navigate])

    const isLoading = authLoading || logoutMutation.isPending

    return {
        logout,
        isLoading,
        error: logoutMutation.error?.message
    }
}
