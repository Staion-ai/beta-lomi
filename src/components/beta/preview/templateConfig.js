// Configuration for available templates
export const AVAILABLE_TEMPLATES = [
    {
        id: 'template1',
        name: 'Template 1',
        description: 'Plantilla moderna con diseño limpio',
        component: () => import('../templates/template_1/Template1')
    },
    {
        id: 'template2',
        name: 'Template 2',
        description: 'Plantilla elegante con estilo profesional',
        component: () => import('../templates/template_2/Template2')
    },
    {
        id: 'template3',
        name: 'Template 3',
        description: 'Plantilla creativa con diseño vibrante',
        component: () => import('../templates/template_3/Template3')
    }
];

export const DEFAULT_TEMPLATE = AVAILABLE_TEMPLATES[0];