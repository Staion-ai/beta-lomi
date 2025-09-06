import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Box, Container } from '@mui/material'

// Componentes refactorizados
import {
  FormHeader,
  CustomStepper,
  FormNavigationButtons,
  StageRenderer
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
      companyName: '',
      companyDescription: '',
      colors: [],
      products: [],
      testimonials: []
    }
  })

  const {
    activeStep,
    isSubmitting,
    handleSubmit,
    handleBack,
    checkStepComplete,
    updateStageFiles
  } = useMultiStepForm(steps)

  // Función para verificar si un paso está completo usando el hook
  const isStepComplete = (stepIndex) => {
    const currentData = methods.getValues()
    return checkStepComplete(stepIndex, currentData)
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
                isSubmitting={isSubmitting}
              />
            </form>
          </FormProvider>
        </Box>
      </Container>
    </div>
    </>
  )
}

export default ProyectForm
