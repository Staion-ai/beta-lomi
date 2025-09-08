import { base_api_url } from "../constants"

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

export const registerUser = async (userData) => {
    const { username, email, password1, password2 } = userData

    try {
        const response = await fetch(`${base_api_url}/dj-rest-auth/registration/`, {
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
        const response = await fetch(`${base_api_url}/dj-rest-auth/login/`, {
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
        throw new Error(error.message || 'Error al iniciar sesión')
    }
}