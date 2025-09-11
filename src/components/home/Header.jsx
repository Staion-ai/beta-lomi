import { Link } from 'react-router-dom'
import '../../assets/styles/Header.css'

const Header = () => {

    function openWhatsAppGroup() {
        const newTab = window.open('', '_blank');
        setTimeout(() => {
            newTab.location.href = 'https://chat.whatsapp.com/HPKs6il6tTZBnvDuTwvXIw?mode=r_t';
        }, 500);
    }



    return (
        <div className="hero">
            <header className="header">
                <div className="header-nav">
                    <div className='logo-container'>
                        <img src="../../lomi-icon.png" alt="Logo LOMI" className="logo" />
                        <h2 className='logo-text'>LOMI</h2>
                    </div>

                    <Link to="/login" className="login-btn">
                        Ingresar
                    </Link>
                </div>

                <div className='info-container'>
                    <h1 className='info-title'>
                        <span className="text-white">Tu web lista en minutos, y</span><br />
                        <span className="text-black">por sólo $7usd al año.</span>
                    </h1>

                    <p className="description">
                        Únete gratis a la comunidad Lomi.Sé de los primeros en LATAM en lanzarla.
                    </p>
                    <button
                        className="cta"
                        onClick={openWhatsAppGroup}>
                        Quiero ya mismo mi sitio web
                    </button>
                    <p className="footer-note"> ¡Corre el tiempo se acaba!</p>
                </div>
            </header>
        </div>
    )
}

export default Header
