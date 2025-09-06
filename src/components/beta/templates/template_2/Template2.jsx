import Header from './components/Header'
import Services from './components/Services'
import Faqs from './components/Faqs'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

import content from '../../../../data/template_structure.json'

function Template2() {
    return (
        <div>
            <Header content={content} />
            <Services content={content} />
            <Faqs content={content} />
            <Testimonials content={content} />
            <Footer content={content} />
        </div>
    )
}

export default Template2
