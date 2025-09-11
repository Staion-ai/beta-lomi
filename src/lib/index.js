import { base_api_url, base_auth_url } from "../constants"


/*
    Solicitudes de API de IA para generacion de links y contenido de los templates
*/
export const createImagesUrl = async (image_files) => {
    if (!image_files || image_files.length === 0) return []

    try {
        const response = await fetch(`${base_api_url}/upload-multiple-images`, {
            method: 'POST',
            body: image_files
        })

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor')
        }

        const data = await response.json()
        return data || []
    } catch (error) {
        throw new Error('Error al procesar las imágenes')
    }
}

export const templateContent = async (template_data) => {
    if (!template_data) return {}

    try {
        const response = await fetch(`${base_api_url}/generate-landing`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(template_data)
        })

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor')
        }

        const data = await response.json()
        return data || {}
    } catch (error) {
        throw new Error('Error al generar el contenido de la plantilla')
    }
}


/*    Solicitudes de API de Autenticación y Gestión de Usuarios
*/
export const registerUser = async (userData) => {
    const { username, email, password1, password2 } = userData

    try {
        const response = await fetch(`${base_auth_url}/dj-rest-auth/registration/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: email, // Using email as username as specified
                email,
                password1,
                password2
            })
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.detail || errorData.message || 'Error en el registro')
        }

        const data = await response.json()
        return data
    } catch (error) {
        throw new Error(error.message || 'Error al registrar usuario')
    }
}

export const loginUser = async (credentials) => {
    const { username, password } = credentials

    try {
        const response = await fetch(`${base_auth_url}/dj-rest-auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.detail || errorData.non_field_errors?.[0] || 'Error en el login')
        }

        const data = await response.json()

        return data
    } catch (error) {
        console.error('Login API error:', error)
        throw new Error(error.message || 'Error al iniciar sesión')
    }
}

export const refreshToken = async (refreshToken) => {
    try {
        const response = await fetch(`${base_auth_url}/dj-rest-auth/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                refresh: refreshToken
            })
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.detail || 'Error refreshing token')
        }

        const data = await response.json()
        return data
    } catch (error) {
        throw new Error(error.message || 'Error al refrescar token')
    }
}

export const logoutUser = async (token) => {
    try {
        const response = await fetch(`${base_auth_url}/dj-rest-auth/logout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (!response.ok) {
            let errorMessage = 'Error al cerrar sesión'
            try {
                const errorData = await response.json()
                errorMessage = errorData.detail || errorData.message || errorMessage
            } catch (parseError) {
                console.warn('Could not parse error response:', parseError)
            }
            throw new Error(errorMessage)
        }

        // Handle successful response
        let data = null
        try {
            // Some logout endpoints return empty responses, which is valid
            const responseText = await response.text()
            if (responseText) {
                data = JSON.parse(responseText)
            } else {
                data = { success: true }
            }
        } catch (parseError) {
            // If we can't parse the response but status was OK, assume success
            console.warn('Could not parse logout response, but status was OK:', parseError)
            data = { success: true }
        }

        return data
    } catch (error) {
        console.error('Logout API error:', error)
        throw new Error(error.message || 'Error al cerrar sesión')
    }
}


/*    Solicitudes de API para desplegar plantillas de usuario
*/
export const createUserTemplate = async (templateData, token) => {
    if (!templateData) return {}
    try {
        const response = await fetch(`${base_auth_url}/api/v1/create-user-template/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(templateData)
        })

        if (!response.ok) {
            const errorData = await response.json()

            if (response.status === 400) {
                throw new Error(errorData.detail)
            }
            throw new Error(errorData.detail || 'Error al crear plantilla de usuario')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Create User Template API error:', error)
        throw new Error(error.message || 'Error al crear plantilla de usuario')
    }
}

/*    Solicitudes de API para obtener los intentos restantes del usuario
*/
export const getUserAttempts = async (user_id) => {
    try {
        const response = await fetch(`${base_auth_url}/api/v1/user-attempts/?user_id=${user_id}`, {
            method: 'GET',
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.detail || 'Error al obtener los intentos del usuario')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Get User Attempts API error:', error)
        throw new Error(error.message || 'Error al obtener los intentos del usuario')
    }
}
/*
 Solciitud para validar si ya existe un proyecto con el mismo nombre
*/
export const checkProjectNameExists = async (projectName, user_id) => {
    try {
        const response = await fetch(`${base_auth_url}/api/v1/check_name_projects/?name_project=${encodeURIComponent(projectName)}&user_id=${user_id}`, {
            method: 'GET',
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.detail || 'Error al verificar la existencia del proyecto')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Check Project Name Exists API error:', error)
        throw new Error(error.message || 'Error al verificar la existencia del proyecto')
    }
}
