import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { 
  Stepper, 
  Step, 
  StepLabel, 
  Box, 
  Button, 
  Typography,
  Container 
} from '@mui/material'
import Stage1 from './stages/Stage1'
import Stage2 from './stages/Stage2'
import Stage3 from './stages/Stage3'
import '../../../assets/styles/Form.css'
import './MultiStepForm.css'

const steps = ['Información de la Empresa', 'Productos y Servicios', 'Testimonios']

function ProyectForm() {
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({})
  
  const methods = useForm({
    defaultValues: {
      // Stage 1 defaults
      companyName: '',
      companyDescription: '',
      colors: [],
      // Stage 2 defaults
      products: [],
      // Stage 3 defaults
      testimonials: []
    }
  })

  const onSubmit = (data) => {
    // Validate current step before proceeding
    if (activeStep === 1 && (!data.products || data.products.length === 0)) {
      alert('Debes agregar al menos un producto o servicio para continuar')
      return
    }
    if (activeStep === 2 && (!data.testimonials || data.testimonials.length === 0)) {
      alert('Debes agregar al menos un testimonio para continuar')
      return
    }

    const updatedData = { ...formData, ...data }
    setFormData(updatedData)
    
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1)
    } else {
      // Final submission
      console.log('Form submitted:', updatedData)
      alert('¡Formulario enviado exitosamente!')
    }
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const renderStageContent = () => {
    switch (activeStep) {
      case 0:
        return <Stage1 />
      case 1:
        return <Stage2 />
      case 2:
        return <Stage3 />
      default:
        return null
    }
  }

  return (
    <div className="form-section">
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" className="form-title">
          Crear tu Perfil
        </Typography>
        <Typography variant="h6" component="p" className="form-subtitle">
          Completa la información de tu empresa en 3 sencillos pasos
        </Typography>

        <Box className="stepper-container">
          <Stepper activeStep={activeStep} alternativeLabel className="custom-stepper">
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel className="custom-step-label">{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box className="form-container">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {renderStageContent()}

              <Box className="form-actions">
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className="back-button"
                  variant="outlined"
                >
                  Anterior
                </Button>
                <Button
                  type="submit"
                  className="submit-button"
                  variant="contained"
                >
                  {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                </Button>
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Container>
    </div>
  )
}

export default ProyectForm
