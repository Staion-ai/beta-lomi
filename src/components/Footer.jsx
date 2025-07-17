import '../assets/styles/Footer.css'

const Footer = () => {
  return (
    <>
        <footer className="footer">
            <p className="footer-message">
                Tu página web no puede seguir siendo un pendiente.<br />
                Hazla realidad con LOMI.
            </p>

            <div className="footer-logo">
                <img src="../../lomi-icon.png" alt="Logo LOMI" className="logo" />
                <span>LOMI</span>
            </div>

            <p className="footer-description">
                Lomi es un producto creado por Staion S.A.S. para que cualquier negocio en LATAM tenga su sitio web en minutos, sin complicaciones y con bajo costo.
            </p>

            <p className="footer-contact">
                ¿Tienes dudas? Escríbenos a:{" "}
                <a href="mailto:hola@staion.com.co" className="email-link">
                    hola@staion.com.co
                </a>
            </p>

            <p className="footer-copy">
                © 2025 Lomi / Staion S.A.S. Todos los derechos reservados.
            </p>
        </footer>
    </>
  )
}

export default Footer

