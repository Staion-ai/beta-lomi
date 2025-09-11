# Beta Lomi - Landing Page Generator

Beta Lomi es una aplicación web desarrollada con React y Vite que permite a los usuarios crear landing pages personalizadas a través de un sistema de plantillas. La aplicación ofrece una interfaz intuitiva para generar páginas web profesionales sin necesidad de conocimientos técnicos avanzados.

## Tecnologías Principales

### Lenguajes y Framework Base
- **React 19.1.0**: Framework principal para la interfaz de usuario
- **JavaScript (ES6+)**: Lenguaje de programación principal
- **Vite 7.0.3**: Herramienta de construcción y desarrollo rápido
- **HTML5 & CSS3**: Tecnologías web estándar

### Librerías Principales

#### Material-UI (MUI) 7.3.2
Sistema de diseño y componentes de interfaz de usuario que proporciona:
- Componentes pre-diseñados siguiendo Material Design
- Sistema de theming consistente
- Componentes de navegación, formularios y layout
- Iconografía con @mui/icons-material

#### TanStack Query 5.87.1
Librería para gestión de estado del servidor que ofrece:
- Cacheo inteligente de datos
- Sincronización automática con el servidor
- Gestión de estados de carga y error
- Optimizaciones de rendimiento para peticiones HTTP

#### Otras Librerías Importantes
- **React Router DOM 7.8.2**: Navegación y ruteo de la aplicación
- **React Hook Form 7.62.0**: Gestión eficiente de formularios
- **Emotion 11.14.0**: Styled-components y CSS-in-JS
- **React Icons 5.5.0**: Biblioteca de iconos adicionales
- **Chroma.js 3.1.2**: Manipulación y análisis de colores

## Estructura del Proyecto

```
beta-lomi/
├── public/                          # Archivos estáticos públicos
│   ├── docs/                       # Documentación adicional
│   └── lomi-icon.png               # Icono de la aplicación
├── src/                            # Código fuente principal
│   ├── assets/                     # Recursos estáticos
│   │   ├── images/                 # Imágenes de la aplicación
│   │   └── styles/                 # Estilos globales CSS
│   ├── components/                 # Componentes React organizados por funcionalidad
│   │   ├── auth/                   # Componentes de autenticación
│   │   ├── beta/                   # Funcionalidades principales de la aplicación
│   │   │   ├── new_proyect/        # Creación de nuevos proyectos
│   │   │   │   ├── components/     # Componentes del flujo de creación
│   │   │   │   ├── hooks/          # Hooks personalizados para proyectos
│   │   │   │   └── stages/         # Etapas del proceso de creación
│   │   │   │       ├── stage_1/    # Primera etapa (configuración básica)
│   │   │   │       ├── stage_2/    # Segunda etapa (personalización)
│   │   │   │       └── stage_3/    # Tercera etapa (finalización)
│   │   │   ├── preview/            # Vista previa de proyectos
│   │   │   └── templates/          # Sistema de plantillas
│   │   │       ├── template_1/     # Plantilla de diseño 1
│   │   │       ├── template_2/     # Plantilla de diseño 2
│   │   │       ├── template_3/     # Plantilla de diseño 3
│   │   │       └── template_4/     # Plantilla de diseño 4
│   │   ├── common/                 # Componentes reutilizables
│   │   └── home/                   # Componentes específicos de la página principal
│   ├── contexts/                   # Contextos de React para gestión de estado
│   │   ├── AuthContext.jsx         # Contexto de autenticación
│   │   ├── TemplateContext.jsx     # Contexto de plantillas
│   │   └── useAuth.js              # Hook de autenticación
│   ├── data/                       # Datos estáticos y configuración
│   ├── hooks/                      # Hooks personalizados
│   │   ├── useLoginUser.js         # Autenticación de usuarios
│   │   ├── useRegisterUser.js      # Registro de usuarios
│   │   ├── useCreateTemplate.js    # Creación de plantillas
│   │   ├── useGetAttempts.js       # Gestión de intentos
│   │   └── useMessage.js           # Sistema de mensajes
│   ├── lib/                        # Librerías y utilidades
│   │   ├── index.js                # Funciones de utilidad general
│   │   └── tokenStorage.js         # Gestión de tokens de autenticación
│   ├── pages/                      # Páginas principales de la aplicación
│   │   ├── Home.jsx                # Página de inicio
│   │   ├── Dashboard.jsx           # Panel de control del usuario
│   │   ├── Login.jsx               # Página de inicio de sesión
│   │   ├── Register.jsx            # Página de registro
│   │   └── Preview.jsx             # Página de vista previa
│   ├── router/                     # Configuración de rutas
│   │   └── AppRoutes.jsx           # Definición de rutas de la aplicación
│   ├── constants/                  # Constantes y configuración
│   ├── App.jsx                     # Componente raíz de la aplicación
│   └── main.jsx                    # Punto de entrada de la aplicación
├── .env.example                    # Variables de entorno de ejemplo
├── package.json                    # Dependencias y scripts del proyecto
├── vite.config.js                  # Configuración de Vite
├── eslint.config.js                # Configuración de ESLint
└── vercel.json                     # Configuración para despliegue en Vercel
```

## Funcionalidades Principales

### Sistema de Autenticación
- Registro y login de usuarios
- Gestión de tokens JWT
- Protección de rutas privadas
- Contexto global de autenticación

### Generador de Landing Pages
- **Proceso Multi-etapa**: Creación guiada en 3 etapas
- **Sistema de Plantillas**: 4 plantillas prediseñadas personalizables
- **Vista Previa en Tiempo Real**: Visualización inmediata de cambios
- **Personalización de Colores**: Sistema de paletas de colores
- **Gestión de Contenido**: Editor de textos e imágenes

### Dashboard de Usuario
- Panel de control personalizado
- Historial de proyectos creados
- Gestión de plantillas guardadas

## Instalación y Desarrollo

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone [repository-url]
cd beta-lomi

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con las configuraciones necesarias
```

### Scripts Disponibles

```bash
# Desarrollo - Inicia servidor de desarrollo con hot reload
npm run dev

# Construcción - Genera build optimizado para producción
npm run build

# Linting - Ejecuta ESLint para verificar calidad del código
npm run lint

# Vista previa - Sirve la build de producción localmente
npm run preview
```

### Configuración de Desarrollo

El proyecto utiliza:
- **Vite** para desarrollo rápido con Hot Module Replacement (HMR)
- **ESLint** para mantener calidad y consistencia del código
- **Material-UI** con theme customizado para diseño consistente
- **TanStack Query** para gestión eficiente de datos del servidor

## Arquitectura del Código

### Patrones Utilizados
- **Context Pattern**: Para gestión de estado global (Auth, Templates)
- **Custom Hooks**: Para lógica reutilizable y separación de responsabilidades
- **Component Composition**: Componentes modulares y reutilizables
- **Multi-stage Forms**: Proceso de creación dividido en etapas

### Gestión de Estado
- **React Context**: Estado global de autenticación y plantillas
- **TanStack Query**: Estado del servidor y cache de datos
- **React Hook Form**: Estado local de formularios
- **Local State**: Estado específico de componentes con useState

## Despliegue

El proyecto está configurado para despliegue en Vercel con `vercel.json`, pero puede ser desplegado en cualquier plataforma que soporte aplicaciones React estáticas.

## Contribución

Para contribuir al proyecto:
1. Seguir las convenciones de código establecidas por ESLint
2. Mantener la estructura de carpetas existente
3. Documentar nuevas funcionalidades
4. Probar cambios antes de enviar pull requests
