import React from 'react'
import {
    Box,
    Typography
} from '@mui/material'

function EmptyStateMessage({ show }) {
    if (!show) return null

    return (
        <Box sx={{
            textAlign: 'center',
            marginTop: '2rem',
            padding: '20px',
            backgroundColor: 'rgba(255, 152, 0, 0.1)',
            border: '1px solid rgba(255, 152, 0, 0.3)',
            borderRadius: '12px',
            maxWidth: '500px',
            margin: '2rem auto 0'
        }}>
            <Typography sx={{
                color: '#FF9800',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '8px'
            }}>
                💡 Tip: Mostrar clientes da credibilidad a tu marca
            </Typography>
            <Typography sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '13px',
                lineHeight: 1.5
            }}>
                Agrega al menos un cliente para continuar. Mostrar clientes reales
                con los que has trabajado aumenta la confianza en tu marca.
            </Typography>
        </Box>
    )
}

export default EmptyStateMessage
