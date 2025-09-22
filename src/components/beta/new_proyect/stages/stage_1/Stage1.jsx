import React from 'react'
import { Box, Alert, Typography } from '@mui/material'
import {
  StageHeader,
  CompanyNameField,
  CompanyDescriptionField,
  EmailField,
  PhoneField,
} from './components'
import { stage1Config } from './constants/stage1Constants'
import { useSocialNetworksCleaner } from '../../hooks'
import { Stage1Provider, useStage1Context } from './context/Stage1Context'

function Stage1Content() {
  const { shouldEnableOtherFields, companyNameValidationState } = useStage1Context()
  useSocialNetworksCleaner()

  return (
    <Box className="stage-container">
      <StageHeader
        title={stage1Config.title}
        description={stage1Config.description}
      />

      {/* Mensaje informativo basado en el estado */}
      {!shouldEnableOtherFields && (
        <Alert
          severity={companyNameValidationState === 'unavailable' ? 'warning' : 'info'}
          sx={{ mb: 3 }}
        >
          <Typography variant="body2">
            {companyNameValidationState === 'unavailable'
              ? '❌ El nombre ingresado no está disponible. Ingresa un nombre diferente para continuar.'
              : '📝 Completa el nombre de tu empresa para habilitar los demás campos'
            }
          </Typography>
        </Alert>
      )}

      {shouldEnableOtherFields && (
        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="body2">
            ✅ Nombre disponible. ¡Puedes continuar completando el formulario!
          </Typography>
        </Alert>
      )}

      <Box>
        {/* El campo de nombre SIEMPRE está habilitado */}
        <CompanyNameField />
        {/* Los demás campos se habilitan solo cuando el nombre está disponible */}
        <CompanyDescriptionField />
        <EmailField />
        <PhoneField />
      </Box>
    </Box>
  )
}

function Stage1() {
  return (
    <Stage1Provider>
      <Stage1Content />
    </Stage1Provider>
  )
}

export default Stage1