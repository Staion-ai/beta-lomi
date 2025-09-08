import Header from './components/Header'
import Services from './components/Services'
import Faqs from './components/Faqs'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

import content from '../../../../data/template_structure.json'


function Template1({ data }) {
    const templateData = data || content;

    return (
        <div>
            <Header content={templateData} />
            <Services content={templateData} />
            <Faqs content={templateData} />
            <Testimonials content={templateData} />
            <Footer content={templateData} />
        </div>
    )
} export default Template1
