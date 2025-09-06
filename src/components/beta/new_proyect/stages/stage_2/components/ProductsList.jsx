import React from 'react'
import { Box, Typography } from '@mui/material'
import ProductCard from './ProductCard'

function ProductsList({
    fields,
    collapsedCards,
    onToggleCollapse,
    onRemove,
    onImageUpload
}) {
    if (fields.length === 0) {
        return (
            <>
                <Typography sx={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    textAlign: 'center',
                    fontStyle: 'italic',
                    marginBottom: '1rem'
                }}>
                    Aún no has agregado productos o servicios
                </Typography>

                <Typography sx={{
                    color: 'rgba(255, 82, 82, 0.8)',
                    fontSize: '14px',
                    textAlign: 'center',
                    marginTop: '1rem'
                }}>
                    * Debes agregar al menos un producto o servicio para continuar
                </Typography>
            </>
        )
    }

    return (
        <Box className="products-container">
            {fields.map((field, index) => {
                const isCollapsed = collapsedCards[index] || false

                return (
                    <ProductCard
                        key={field.id}
                        field={field}
                        index={index}
                        isCollapsed={isCollapsed}
                        onToggleCollapse={onToggleCollapse}
                        onRemove={onRemove}
                        onImageUpload={onImageUpload}
                    />
                )
            })}
        </Box>
    )
}

export default ProductsList
