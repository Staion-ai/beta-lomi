import React, { useState } from 'react'
import '../../assets/styles/Form.css'

const Form = () => {
    const [formData, setFormData] = useState({
        businessName: '',
        businessType: '',
        userName: '',
        whatsapp: '',
        privacyPolicy: false,
        marketingConsent: false,
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formKey, setFormKey] = useState(Date.now());
    const [successMessage, setSuccessMessage] = useState('');

    //e: event
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const clearForm = () => {
        setFormData({
            businessName: "",
            businessType: "",
            userName: "",
            whatsapp: "",
            privacyPolicy: false,
            marketingConsent: false
        });
        setFormKey(Date.now());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setShowError(false);
        setShowSuccess(false);

        // Validar campos requeridos en el frontend
        if (!formData.businessName || !formData.businessType || !formData.userName || !formData.whatsapp) {
            setErrorMessage('Por favor, completa todos los campos obligatorios.');
            setShowError(true);
            setIsSubmitting(false);
            setTimeout(() => setShowError(false), 5000);
            return;
        }

        if (!formData.privacyPolicy) {
            setErrorMessage('Debes aceptar la política de privacidad para continuar.');
            setShowError(true);
            setIsSubmitting(false);
            setTimeout(() => setShowError(false), 5000);
            return;
        }

        try {

            const response = await fetch('https://staion-api.onrender.com/api/send-lomi-email/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();


            if (result.message === '¡Tu registro ha sido confirmado! Pronto recibirás mas información.') {
                setSuccessMessage(` ${result.message}`);
                setShowSuccess(true);
                setShowError(false);
                setErrorMessage('');
                setTimeout(() => setShowSuccess(false), 8000);

                setTimeout(() => {
                    window.open('https://chat.whatsapp.com/HPKs6il6tTZBnvDuTwvXIw?mode=r_t', '_blank');
                }, 1000);


            } else {
                setErrorMessage(result.message || 'Error al enviar el formulario.');
                setShowError(true);
                setTimeout(() => setShowError(false), 5000);
            }

            // Limpiar formulario independientemente del resultado
            clearForm();

        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error de conexión. Por favor, verifica tu conexión a internet.');
            setShowError(true);
            setTimeout(() => setShowError(false), 5000);
            setTimeout(() => {
                clearForm();
            }, 3000);
        } finally {
            setIsSubmitting(false);
        }

    };

    return (
        <>
            <div className="form-section" id="formulario">
                <h2 className="form-title">Lista de espera</h2>
                <p className="form-subtitle">Sé de los primeros en acceder.</p>

                <form key={formKey} className="form-container" id="businessForm" onSubmit={handleSubmit}>

                    <label>
                        <span className="input-label">Nombre del negocio</span>
                        <input
                            type="text"
                            name="businessName"
                            pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ ]+"
                            title="Solo se permiten letras y espacios"
                            value={formData.businessName}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                            required
                        />
                    </label>

                    <label>
                        <span className="input-label">Tipo de negocio (Salud, comida, belleza, educación, servicios, etc.)</span>
                        <input
                            type="text"
                            name="businessType"
                            pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ ]+"
                            title="Solo se permiten letras y espacios"
                            value={formData.businessType}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                            required
                        />
                    </label>

                    <label>
                        <span className="input-label">Tu nombre</span>
                        <input
                            type="text"
                            name="userName"
                            pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ ]+"
                            title="Solo se permiten letras y espacios"
                            value={formData.userName}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                            required
                        />
                    </label>

                    <label>
                        <span className="input-label">Tu WhatsApp</span>
                        <input
                            type="text"
                            name="whatsapp"
                            pattern="[\+\-\s\(\)0-9]+"
                            title="Ingresa solo números (mínimo 7, máximo 15)"
                            value={formData.whatsapp}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                            required
                        />
                    </label>

                    <div className='checkbox-container'>
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="privacyPolicy"
                                checked={formData.privacyPolicy}
                                onChange={handleInputChange}
                                disabled={isSubmitting}
                                required
                            />
                            Acepto el tratamiento de mis datos personales según la política de privacidad.
                        </label>

                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="marketingConsent"
                                checked={formData.marketingConsent}
                                onChange={handleInputChange}
                                disabled={isSubmitting}
                                required
                            />
                            Autorizo a Lomi a enviarme novedades, actualizaciones e información sobre el producto.
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="submit-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Enviando...' : 'Registrarme ahora'}
                    </button>

                    {showSuccess && (
                        <div className="success-message">
                            {successMessage}
                        </div>
                    )}

                    {showError && (
                        <div className="error-message">
                            {errorMessage}
                        </div>
                    )}

                    <a
                        href="/docs/Politicas_Lomi.pdf"
                        className="form-legal"
                        target="_blank"
                        rel="noopener noreferrer">

                        Consulta nuestra{" "}
                        <span className="underline-text">Política de Privacidad</span> y{" "}
                        <span className="underline-text">Términos y Condiciones</span>
                    </a>
                </form>
            </div>
        </>
    )
}

export default Form