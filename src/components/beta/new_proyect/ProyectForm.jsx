import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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

const steps = ['Información de la Empresa', 'Detalles del Proyecto', 'Productos y Servicios', 'Clientes']

function ProyectForm() {
  const navigate = useNavigate()
  const methods = useForm({
    defaultValues: {
      company_name: '',
      description: '',
      logo: null,
      heroImage: null,
      colors: [],
      socialNetworks: [],
      socialNetworkLinks: {},
      products: [],
      testimonials: []
    }
  })

  const handleFormComplete = () => {
    // Solo navegar, el contenido ya está en el context
    navigate('/preview')
  }

  const {
    activeStep,
    isSubmitting,
    isUploadingImages,
    isGeneratingContent,
    notification,
    handleCloseNotification,
    handleSubmit,
    handleBack,
    isStepComplete: checkStepComplete,
    updateStageFiles,
    setFormData,
    showCurrentStepErrors
  } = useMultiStepForm(steps, handleFormComplete)

  const isStepComplete = (stepIndex) => {
    const currentData = methods.watch()
    return checkStepComplete ? checkStepComplete(stepIndex, currentData) : false
  }

  const handleShowErrors = () => {
    const currentData = methods.watch()
    showCurrentStepErrors(currentData)
  }


  useEffect(() => {
    try {
      const raw = localStorage.getItem('template_form_data')
      if (!raw) return

      const parsed = JSON.parse(raw)
      if (!parsed || typeof parsed !== 'object') return

      methods.reset(parsed)

      if (typeof setFormData === 'function') {
        setFormData(parsed)
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Could not load template_form_data from localStorage:', err)
    }
  }, [])

  return (
    <>
      <AuthHeader title="Dashboard - Crear Proyecto" showBackButton={true} />
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
                  isSubmitting={isSubmitting || isUploadingImages || isGeneratingContent}
                  onShowErrors={handleShowErrors}
                />
              </form>

              {isUploadingImages && (
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <p>Subiendo imágenes...</p>
                </div>
              )}

              {isGeneratingContent && (
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <p>Generando contenido personalizado...</p>
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
