import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

function AddProductButton({
    fieldsLength,
    maxProducts = 4,
    onAddProduct
}) {
    const canAddMore = fieldsLength < maxProducts

    if (!canAddMore) {
        return (
            <Typography className="max-reached-text">
                Máximo de productos/servicios alcanzado ({fieldsLength}/{maxProducts})
            </Typography>
        )
    }

    return (
        <Button
            onClick={onAddProduct}
            className="add-more-button"
            startIcon={<AddIcon />}
            variant="outlined"
        >
            {fieldsLength === 0
                ? 'Agregar primer producto/servicio'
                : `Agregar otro producto/servicio (${fieldsLength}/${maxProducts})`
            }
        </Button>
    )
}

export default AddProductButton
