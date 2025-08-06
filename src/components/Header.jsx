import '../assets/styles/Header.css'

const Header = () => {
    
    function openWhatsAppGroup() {
        setTimeout(() => {
          window.open('https://chat.whatsapp.com/HPKs6il6tTZBnvDuTwvXIw?mode=r_t', '_blank');
        }, 1000);
    }


    return (
    <>
        <div className="hero">
            <header className="header">
                <div className='logo-container'>
                    <img src="../../lomi-icon.png" alt="Logo LOMI" className="logo" />
                    <h2 className='logo-text'>LOMI</h2>
                </div>
                
                <div className='info-container'>
                    <h1 className='info-title'>
                        <span className="text-white">Tu web lista en minutos, y</span><br />
                        <span className="text-black">por sólo $7usd al año.</span>
                    </h1>
        
                    <p className="description"> Los primeros 1000 negocios de LATAM que tendrán su web lista en menos de 15 minutos. </p>
                    <button 
                        className="cta"
                        onClick={ openWhatsAppGroup }>
                        Quiero mi sitio antes que todos
                    </button>
                    <p className="footer-note"> Únete a la lista de espera y sé parte del lanzamiento de LOMI.</p>
                </div>
            </header>
        </div>
    </>
  )
}

export default Header
