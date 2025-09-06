import React from 'react'
import {
    Box,
    Button,
    Typography
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

function AddClientButton({ clientsCount, onAddClient, maxClients = 4 }) {
    const canAddMore = clientsCount < maxClients

    if (!canAddMore) {
        return (
            <Box sx={{
                textAlign: 'center',
                marginTop: '2rem'
            }}>
                <Box sx={{
                    padding: '16px 24px',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    border: '1px solid rgba(76, 175, 80, 0.3)',
                    borderRadius: '12px',
                    display: 'inline-block'
                }}>
                    <Typography sx={{
                        color: '#4CAF50',
                        fontWeight: 600,
                        fontSize: '16px'
                    }}>
                        🎉 ¡Perfecto! Has completado todos los clientes ({maxClients}/{maxClients})
                    </Typography>
                </Box>
            </Box>
        )
    }

    return (
        <Box sx={{
            textAlign: 'center',
            marginTop: '2rem'
        }}>
            <Button
                onClick={onAddClient}
                className="add-more-button"
                startIcon={<AddIcon />}
                variant="outlined"
                size="large"
                sx={{
                    borderColor: '#F9DF88',
                    color: '#F9DF88',
                    borderRadius: '12px',
                    padding: '12px 32px',
                    fontSize: '16px',
                    fontWeight: 600,
                    textTransform: 'none',
                    minWidth: '280px',
                    '&:hover': {
                        borderColor: '#F9DF88',
                        backgroundColor: 'rgba(249, 223, 136, 0.1)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 20px rgba(249, 223, 136, 0.2)'
                    },
                    transition: 'all 0.3s ease'
                }}
            >
                {clientsCount === 0
                    ? '✨ Agregar primer cliente'
                    : `Agregar cliente (${clientsCount}/${maxClients})`
                }
            </Button>
        </Box>
    )
}

export default AddClientButton
