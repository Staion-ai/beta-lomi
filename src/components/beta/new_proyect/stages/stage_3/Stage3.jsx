import React from 'react'
import { Box, Typography } from '@mui/material'
import {
  ProductsList,
  AddProductButton,
  useProductsManager
} from './components'

function Stage3({ updateStageFiles }) {
  const {
    fields,
    collapsedCards,
    toggleCardCollapse,
    addProduct,
    removeProduct,
    handleImageUpload
  } = useProductsManager(updateStageFiles)

  return (
    <Box className="stage-container">
      <Typography variant="h4" component="h2" className="stage-title">
        Productos y Servicios
      </Typography>
      <Typography variant="body1" className="stage-description">
        Agrega hasta 4 productos o servicios que ofrece tu empresa
      </Typography>

      <Box>
        <ProductsList
          fields={fields}
          collapsedCards={collapsedCards}
          onToggleCollapse={toggleCardCollapse}
          onRemove={removeProduct}
          onImageUpload={handleImageUpload}
        />

        <AddProductButton
          fieldsLength={fields.length}
          maxProducts={4}
          onAddProduct={addProduct}
        />
      </Box>
    </Box>
  )
}

export default Stage3