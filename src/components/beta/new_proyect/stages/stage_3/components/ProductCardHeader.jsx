import React from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import {
    Remove as RemoveIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon
} from '@mui/icons-material'

function ProductCardHeader({
    index,
    isCollapsed,
    hasErrors,
    hasContent,
    onToggleCollapse,
    onRemove
}) {
    return (
        <Box className="dynamic-section-header">
            <Box className="section-header-left">
                <Typography className="section-number">
                    {`Producto/Servicio ${index + 1}`}
                </Typography>
                {hasContent && (
                    <Box className="card-status-indicators">
                        {hasErrors && (
                            <Typography variant="caption" className="error-indicator">
                                ⚠ Incompleto
                            </Typography>
                        )}
                        {!hasErrors && hasContent && (
                            <Typography variant="caption" className="success-indicator">
                                ✓ Completo
                            </Typography>
                        )}
                    </Box>
                )}
            </Box>
            <Box className="section-header-actions">
                <IconButton
                    onClick={() => onToggleCollapse(index)}
                    className="collapse-button"
                    size="small"
                    title={isCollapsed ? 'Expandir' : 'Colapsar'}
                >
                    {isCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </IconButton>
                <IconButton
                    onClick={() => onRemove(index)}
                    className="remove-button"
                    size="small"
                    title="Eliminar producto/servicio"
                >
                    <RemoveIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default ProductCardHeader
