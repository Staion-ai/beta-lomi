import React from 'react'
import { Typography, Container } from '@mui/material'

/**
 * Componente que muestra el encabezado del formulario
 */
const FormHeader = () => {
    return (
        <Container maxWidth="md">
            <Typography variant="h2" component="h1" className="form-title">
                Crea tu proyecto
            </Typography>
            <Typography variant="h6" component="p" className="form-subtitle">
                Completa la información de tu empresa en 3 sencillos pasos
            </Typography>
        </Container>
    )
}

export default FormHeader
