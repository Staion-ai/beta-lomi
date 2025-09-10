// Configuration for available templates
export const AVAILABLE_TEMPLATES = [
    {
        id: 'https://github.com/Staion-Startup/lomi-template-1',
        name: 'Template 1',
        description: 'Plantilla moderna con diseño limpio',
        component: () => import('../templates/template_1/Template1')
    },
    {
        id: 'https://github.com/Staion-Startup/lomi-template-2',
        name: 'Template 2',
        description: 'Plantilla elegante con estilo profesional',
        component: () => import('../templates/template_2/Template2')
    },
    {
        id: 'https://github.com/Staion-Startup/lomi-template-3',
        name: 'Template 3',
        description: 'Plantilla creativa con diseño vibrante',
        component: () => import('../templates/template_3/Template3')
    },
    {
        id: 'https://github.com/Staion-Startup/lomi-template-4',
        name: 'Template 4',
        description: 'Plantilla minimalista con enfoque en contenido',
        component: () => import('../templates/template_4/Template4')
    }
];

export const DEFAULT_TEMPLATE = AVAILABLE_TEMPLATES[0];