export const profile = {
  name: "Edgar",
  title: "Full Stack Developer",
  stack: "Laravel · Vue.js · React · APIs RESTful · WebSockets",
  summary:
    "5 años construyendo productos web end-to-end: modelo de datos, backend, interfaz, despliegue en Linux y soporte en producción.",
  location: "Mérida, Venezuela",
  availability: "Trabajando en remoto desde 2021",
  languages: "Español nativo · Inglés B2",
  email: "edqarmarquinaruzibo@gmail.com",
  linkedin: "https://linkedin.com/in/edqar-marquina-ruiz-11b611364",
  github: "", // add when ready
  cvUrl: "/cv.pdf", // we'll place it in public/ later
};

export const about = {
  paragraphs: [
    "Soy desarrollador Full Stack con 4 años de experiencia construyendo y manteniendo productos web con Laravel/PHP en backend y Vue.js/React en frontend. He entregado APIs RESTful, aplicaciones móviles con React Native y sistemas en tiempo real, con optimización de MySQL para operaciones de gran volumen.",
    "Trabajo remoto desde 2022 y asumo el ciclo completo: modelo de datos, backend, interfaz, despliegue en Linux y soporte en producción. Me interesa el ownership end-to-end: entender el problema del negocio, proponer la arquitectura y llevarla hasta producción.",
  ],
};

export const skills = [
  {
    category: "Backend",
    items: ["PHP · Laravel · Yii2", "APIs RESTful", "Node.js", "WebSockets"],
  },
  {
    category: "Frontend",
    items: ["Vue.js · React", "JavaScript (ES6+)", "HTML5 · CSS3", "Responsive Design"],
  },
  {
    category: "Bases de datos",
    items: ["MySQL", "Diseño relacional", "Optimización de consultas"],
  },
  {
    category: "Sistemas & herramientas",
    items: ["Linux (deploy & mantenimiento)", "Git", "Docker", "Arquitectura cliente-servidor"],
  },
];

export const projects = [
  {
    id: "amazon-extractor",
    title: "Extractor de Datos Amazon",
    description:
      "Plataforma full stack de extracción de datos: backend Laravel, MySQL optimizado, APIs RESTful, app móvil React Native y panel web en React/Vue. Incluye scraping automatizado y manejo de grandes volúmenes.",
    tags: ["Laravel", "MySQL", "React Native", "React", "Vue.js", "REST API"],
    categories: ["laravel", "react"],
    image: "amazon-extractor",
  },
  {
    id: "realtime-chat",
    title: "Sistemas de Chat en Tiempo Real",
    description:
      "Mensajería instantánea para clientes privados con arquitectura WebSocket bidireccional, integrada en plataformas CRM y preparada para múltiples usuarios concurrentes.",
    tags: ["WebSockets", "React", "Laravel", "CRM"],
    categories: ["react", "realtime"],
    image: "realtime-chat",
  },
  {
    id: "obsiryte",
    title: "Obsiryte — Control de Versiones",
    description:
      "Herramienta propia de control de versiones: inicialización de repositorios, indexación del área de preparación, hashing SHA-1 y objetos de confirmación.",
    tags: ["Kotlin", "SHA-1", "Git internals"],
    categories: ["tooling"],
    image: "obsiryte",
  },
];

export const experience = [
  {
    role: "Full Stack Developer Senior",
    company: "BeastCRM",
    period: "2025 – Presente",
    location: "Remote",
    bullets: [
      "Desarrollo de funcionalidades frontend con React y Vue.js en un CRM para clientes privados, implementando interfaces complejas y optimizando el rendimiento.",
      "Implementación de sistemas de chat en tiempo real con WebSockets, integrados en plataformas CRM existentes.",
      "Mantenimiento y optimización de código existente, con foco en estabilidad, rendimiento y buenas prácticas.",
      "Colaboración directa con clientes en el diseño y evolución de funcionalidades clave del CRM.",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "Workflow Admin",
    period: "2022 – 2025",
    location: "Remote",
    bullets: [
      "Diseño y desarrollo del backend en PHP/Laravel para un extractor de datos de Amazon, incluyendo modelo de datos y persistencia en MySQL.",
      "Desarrollo de APIs RESTful para la comunicación entre el backend Laravel, la aplicación web y la app móvil en React Native.",
      "Optimización de consultas MySQL para operaciones de extracción masiva, mejorando el rendimiento del procesamiento.",
      "Creación de interfaces responsivas con React y Vue.js para la operación y visualización de datos extraídos.",
      "Configuración, despliegue y mantenimiento de servidores Linux en producción.",
    ],
  },
];

export const education = {
  title: "Autodidacta · Formación Continua",
  subtitle: "Aprendizaje autodirigido y proyectos prácticos",
  description:
    "Desarrollo profesional mediante aprendizaje autodirigido, proyectos prácticos y experiencia laboral directa.",
};