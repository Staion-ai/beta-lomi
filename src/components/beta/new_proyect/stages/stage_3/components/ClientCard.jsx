import React from 'react'
import {
    Box,
    IconButton,
    Collapse,
    Typography
} from '@mui/material'
import {
    Remove as RemoveIcon,
    ExpandMore as ExpandMoreIcon
} from '@mui/icons-material'
import ClientForm from './ClientForm'

function ClientCard({
    index,
    isExpanded,
    onToggleExpand,
    onRemove,
    hasError
}) {
    const handleHeaderClick = () => {
        onToggleExpand(index)
    }

    const handleRemoveClick = (e) => {
        e.stopPropagation()
        onRemove(index)
    }

    return (
        <Box
            className="dynamic-section"
            sx={{
                height: 'fit-content',
                minHeight: '80px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                transition: 'all 0.3s ease',
                '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                }
            }}
        >
            <Box
                className="dynamic-section-header"
                sx={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    borderRadius: '12px 12px 0 0',
                    backgroundColor: isExpanded ? 'rgba(249, 223, 136, 0.1)' : 'transparent',
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                        backgroundColor: 'rgba(249, 223, 136, 0.15)'
                    }
                }}
                onClick={handleHeaderClick}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography
                        className="section-number"
                        sx={{
                            fontSize: '16px',
                            fontWeight: 600,
                            color: isExpanded ? '#F9DF88' : 'rgba(255, 255, 255, 0.9)'
                        }}
                    >
                        {`Cliente ${index + 1}`}
                    </Typography>

                    {/* Indicador visual del estado del formulario */}
                    {hasError && (
                        <Box sx={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: '#ff5252',
                            animation: 'pulse 2s infinite'
                        }} />
                    )}

                    <IconButton
                        size="small"
                        sx={{
                            color: isExpanded ? '#F9DF88' : 'rgba(255, 255, 255, 0.7)',
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </Box>

                <IconButton
                    onClick={handleRemoveClick}
                    className="remove-button"
                    size="small"
                    sx={{
                        color: '#ff5252',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 82, 82, 0.1)',
                            transform: 'scale(1.1)'
                        },
                        transition: 'all 0.2s ease'
                    }}
                >
                    <RemoveIcon />
                </IconButton>
            </Box>

            <Collapse in={isExpanded} timeout={400} unmountOnExit>
                <Box sx={{
                    padding: '0 1rem 1.5rem 1rem',
                    '& .form-field': {
                        marginBottom: '1.5rem'
                    }
                }}>
                    <ClientForm index={index} />
                </Box>
            </Collapse>
        </Box>
    )
}

export default ClientCard
