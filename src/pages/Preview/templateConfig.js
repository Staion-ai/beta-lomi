// Configuration for available templates
export const AVAILABLE_TEMPLATES = [
    {
        id: 'template1',
        name: 'Template 1',
        description: 'Plantilla moderna con diseño limpio',
        component: () => import('../../components/beta/templates/template_1/Template1')
    },
    {
        id: 'template2', 
        name: 'Template 2',
        description: 'Plantilla elegante con estilo profesional',
        component: () => import('../../components/beta/templates/template_2/Template2')
    }
];

export const DEFAULT_TEMPLATE = AVAILABLE_TEMPLATES[0];