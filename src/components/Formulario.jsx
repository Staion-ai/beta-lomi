
import '../assets/styles/Formulario.css'

const Formulario = () => {
  return (
    <>
        <div className="form-section">
            <h2 className="form-title">Asegura tu lugar ahora</h2>
            <p className="form-subtitle">Solo los primeros acceden antes.</p>

            <form className="form-container">
                <label>
                    <span className="input-label">Nombre del negocio</span>
                    <input type="text" />
                </label>

                <label>
                    <span className="input-label">Tipo de negocio (Salud, comida, belleza, educación, servicios, etc.)</span>
                    <input type="text" />
                </label>

                <label>
                    <span className="input-label">Tu nombre</span>
                    <input type="text" />
                </label>

                <label>
                    <span className="input-label">Tu WhatsApp</span>
                    <input type="text" />
                </label>

                <div className='checkbox-container'>
                    <label className="checkbox-label">
                        <input type="checkbox" />
                        Acepto el tratamiento de mis datos personales según la política de privacidad.
                    </label>

                    <label className="checkbox-label">
                        <input type="checkbox" />
                        Autorizo a Lomi contactarme con información y novedades sobre el producto.
                    </label>
                </div>

                <button type="submit" className="submit-button">Registrarme ahora</button>

                <a href="#" className="form-legal">
                    Consulta nuestra Política de Privacidad y Términos y Condiciones
                </a>
            </form>
        </div>
    </>
  )
}

export default Formulario
