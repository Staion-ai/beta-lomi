import './assets/styles/App.css'

/* HOOK PARA TOMAR LOS COLORES DEL JSON */
import { useTheme } from './hooks/useTheme.js';
import content from '../../../../data/template_structure.json'


import NavBar from './components/NavBar.jsx';
import HeroSection from './components/HeroSection.jsx';
import ValueProposition from './components/ValueProposition.jsx';
import Faqs from './components/Faqs.jsx';
import Testimony from './components/Testimony.jsx';
import Footer from './components/Footer.jsx';

const components = {
    navbar: NavBar,
    hero_section: HeroSection,
    value_proposition: ValueProposition,
    faqs: Faqs,
    testimony: Testimony,
    footer: Footer
};

function Template4({ data }) {

    const { styles, ...sections } = data || content;

    useTheme(styles);

    const filteredSections = Object.entries(sections).filter(([key, props]) => {
        if (!components[key]) return false;
        if (key === "faqs") return (props)?.questions?.length > 0;
        if (key === "testimony") return (props)?.testimonials?.length > 0;

        return true;
    });

    return (
        <div>
            {filteredSections.map(([key, props]) => {
                const Component = components[key]
                return Component ? <Component key={key} {...props} /> : null
            })}
        </div>
    )
}

export default Template4
