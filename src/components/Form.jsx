import React, {useState} from 'react'
import '../assets/styles/Formulario.css'

const Form = () => {
    const [ formData, setFormData ] = useState({
        businessName: '',
        businessType: '',
        userName: '',
        whatsapp: '',
        privacyPolicy: false,
        marketingConsent: false,
    });

    const [ showSuccess, setShowSuccess ] = useState( false );
    const [ showError, setShowError ] = useState( false );
    const [ errorMessage, setErrorMessage ] = useState( '' );
    const [ isSubmitting, setIsSubmitting ] = useState( false );

    //e: event
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        setIsSubmitting( true );
        setShowError( false );
        setShowSuccess( false );
        
        // Validar campos requeridos en el frontend
        if ( !formData.businessName || !formData.businessType || !formData.userName || !formData.whatsapp ) {
          setErrorMessage( 'Por favor, completa todos los campos obligatorios.' );
          setShowError( true );
          setIsSubmitting( false );
          setTimeout( ( ) => setShowError( false ), 5000 );
          return;
        }
        
        if ( !formData.privacyPolicy ) {
          setErrorMessage( 'Debes aceptar la política de privacidad para continuar.' );
          setShowError( true );
          setIsSubmitting( false );
          setTimeout( ( ) => setShowError( false ), 5000 );
          return;
        }

        try {
            // Enviar datos al servidor PHP
            const response = await fetch('http://localhost/landing-lomi/backend/api/send-mail.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
});
    
            const result = await response.json();
    
            if ( result.success ) {
                // Mostrar mensaje de éxito
                setShowSuccess( true );
                setErrorMessage( '' );
            
                setFormData({
                    businessName: '',
                    businessType: '',
                    userName: '',
                    whatsapp: '',
                    privacyPolicy: false,
                    marketingConsent: false
                });
            
                // Ocultar mensaje después de 8 segundos
                setTimeout( ( ) => setShowSuccess( false ), 8000 );
            } else {
                // Mostrar mensaje de error del servidor
                setErrorMessage( result.message || 'Error al enviar el formulario.' );
                setShowError( true );
                setTimeout( ( ) => setShowError( false ), 5000 );
          }
        } catch ( error ) {
            console.error( 'Error:', error );
            setErrorMessage( 'Error de conexión. Por favor, verifica tu conexión a internet.' );
            setShowError( true );
            setTimeout( ( ) => setShowError( false ), 5000 );
        } finally {
            setIsSubmitting( false );
        }


    };

    return (
    <>
        <div className="form-section" id="formulario">
            <h2 className="form-title">Asegura tu lugar ahora</h2>
            <p className="form-subtitle">Solo los primeros acceden antes.</p>

            <form className="form-container" id="businessForm" onSubmit={ handleSubmit }>

                { showSuccess && (
                    <div className="success-message">
                        ¡Gracias por registrarte! Nos pondremos en contacto contigo pronto.
                    </div>
                )}

                { showError && (
                    <div className="error-message">
                        { errorMessage }
                    </div>
                )}

                <label>
                    <span className="input-label">Nombre del negocio</span>
                    <input 
                        type="text"
                        name="businessName"
                        value = { formData.businessName }
                        onChange = { handleInputChange }
                        disabled = { isSubmitting }
                        required 
                    />
                </label>

                <label>
                    <span className="input-label">Tipo de negocio (Salud, comida, belleza, educación, servicios, etc.)</span>
                    <input 
                        type="text"
                        name="businessType"
                        value = { formData.businessType }
                        onChange = { handleInputChange }
                        disabled = { isSubmitting }
                        required
                    />
                </label>

                <label>
                    <span className="input-label">Tu nombre</span>
                    <input 
                        type="text"
                        name="userName"
                        value = { formData.userName }
                        onChange ={ handleInputChange }
                        disabled = { isSubmitting }
                        required 
                    />
                </label>

                <label>
                    <span className="input-label">Tu WhatsApp</span>
                    <input 
                        type="text"
                        name="whatsapp"
                        value = { formData.whatsapp }
                        onChange = { handleInputChange }
                        disabled = { isSubmitting }
                        required 
                    />
                </label>

                <div className='checkbox-container'>
                    <label className="checkbox-label">
                        <input 
                            type="checkbox"
                            name="privacyPolicy"
                            checked = { formData.privacyPolicy }
                            onChange={ handleInputChange }
                            disabled = { isSubmitting}
                            required 
                        />
                        Acepto el tratamiento de mis datos personales según la política de privacidad.
                    </label>

                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="marketingConsent"
                            checked = { formData.marketingConsent }
                            onChange = { handleInputChange }
                            disabled = { isSubmitting }
                            required 
                        />
                        Autorizo a Lomi contactarme con información y novedades sobre el producto.
                    </label>
                </div>

                <button 
                    type="submit"
                    className="submit-button"
                    disabled = { isSubmitting }
                >
                    { isSubmitting  ? 'Enviando...' : 'Registrarme ahora' }
                </button>

                <a href="#" className="form-legal">
                    Consulta nuestra Política de Privacidad y Términos y Condiciones
                </a>
            </form>
        </div>
    </>
    )
}


export default Form
