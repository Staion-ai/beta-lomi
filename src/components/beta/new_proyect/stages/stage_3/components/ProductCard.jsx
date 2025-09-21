import React from 'react'
import { Box, Collapse } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import ProductCardHeader from './ProductCardHeader'
import ProductForm from './ProductForm'

function ProductCard({
    field,
    index,
    isCollapsed,
    onToggleCollapse,
    onRemove,
    onImageUpload
}) {
    const { formState: { errors } } = useFormContext()

    const hasErrors = errors.products?.[index]
    const hasContent = field.name || field.image

    return (
        <Box className={`dynamic-section ${isCollapsed ? 'collapsed' : ''}`}>
            <ProductCardHeader
                index={index}
                isCollapsed={isCollapsed}
                hasErrors={hasErrors}
                hasContent={hasContent}
                onToggleCollapse={onToggleCollapse}
                onRemove={onRemove}
            />

            <Collapse in={!isCollapsed} timeout={300}>
                <ProductForm
                    index={index}
                    onImageUpload={onImageUpload}
                />
            </Collapse>
        </Box>
    )
}

export default ProductCard
