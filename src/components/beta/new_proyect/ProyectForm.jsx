import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Box, Container } from '@mui/material'

// Componentes refactorizados
import {
  FormHeader,
  CustomStepper,
  FormNavigationButtons,
  StageRenderer,
  NotificationSnackbar
} from './components'

// Hooks personalizados
import { useMultiStepForm } from './hooks'

// Componente de autenticación
import AuthHeader from '../../auth/AuthHeader'

// Estilos
import '../../../assets/styles/Form.css'
import './MultiStepForm.css'

const steps = ['Información de la Empresa', 'Productos y Servicios', 'Clientes']

function ProyectForm() {
  const methods = useForm({
    defaultValues: {
      company_name: '',
      description: '',
      colors: [],
      products: [],
      testimonials: []
    }
  })

  const {
    activeStep,
    isSubmitting,
    isUploadingImages,
    notification,
    handleCloseNotification,
    handleSubmit,
    handleBack,
    isStepComplete: checkStepComplete,
    updateStageFiles
  } = useMultiStepForm(steps)

  const isStepComplete = (stepIndex) => {
    const currentData = methods.getValues()
    return checkStepComplete ? checkStepComplete(stepIndex, currentData) : false
  }

  return (
    <>
      <AuthHeader title="Dashboard - Crear Proyecto" />
      <div className="form-section">
        <FormHeader />

        <Container maxWidth="md">
          <CustomStepper
            activeStep={activeStep}
            steps={steps}
            isStepComplete={isStepComplete}
          />

          <Box className="form-container" style={{ marginBottom: '2rem' }}>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(handleSubmit)}>
                <StageRenderer activeStep={activeStep} updateStageFiles={updateStageFiles} />

                <FormNavigationButtons
                  activeStep={activeStep}
                  steps={steps}
                  onBack={handleBack}
                  isStepComplete={isStepComplete}
                  isSubmitting={isSubmitting || isUploadingImages}
                />
              </form>

              {isUploadingImages && (
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <p>Generando URLs de imágenes...</p>
                </div>
              )}
            </FormProvider>
          </Box>
        </Container>
      </div>

      <NotificationSnackbar
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleCloseNotification}
      />
    </>
  )
}

export default ProyectForm
