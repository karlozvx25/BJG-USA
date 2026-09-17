import {
  House,
  Files,
  PenLine,
  Users,
  Building2,
  MessageCircle,
} from "lucide-react";
export const services = [
  {
    slug: "propiedades-mexico",
    title: "Tengo una propiedad",
    label: "Propiedades",
    description: "Compra, venta, regularización, conflictos o escrituras.",
    icon: House,
  },
  {
    slug: "herencias-mexico",
    title: "Necesito resolver una herencia",
    label: "Herencias",
    description: "Testamentos, sucesiones y propiedades heredadas.",
    icon: Files,
  },
  {
    slug: "poderes-mexico",
    title: "Necesito hacer un poder",
    label: "Poderes",
    description: "Representación y gestiones cuando no puedes estar.",
    icon: PenLine,
  },
  {
    slug: "familia-mexico",
    title: "Tengo un asunto familiar",
    label: "Familia",
    description: "Divorcio, pensión, convenios y patrimonio familiar.",
    icon: Users,
  },
  {
    slug: "empresas-mexico",
    title: "Tengo una empresa",
    label: "Empresas",
    description: "Contratos, sociedades y representación en México.",
    icon: Building2,
  },
  {
    slug: "otros-asuntos",
    title: "Necesito resolver algo más",
    label: "Otro",
    description: "No necesitas saber cómo se llama. Cuéntanos qué ocurre.",
    icon: MessageCircle,
  },
];
export const cities: Record<string, string> = {
  houston: "Houston",
  dallas: "Dallas",
  "los-angeles": "Los Ángeles",
  chicago: "Chicago",
  "san-jose": "San José",
};
export const steps = [
  [
    "Cuéntanos tu situación",
    "No necesitas usar términos jurídicos. Dinos qué está pasando.",
  ],
  [
    "Revisamos qué necesitas",
    "Analizamos tu situación y la información que hace falta.",
  ],
  [
    "Te explicamos tus opciones",
    "Qué se puede hacer, qué necesitamos y cuál es el siguiente paso.",
  ],
  [
    "Avanzamos contigo",
    "Si decides contratar BJG, acordamos una ruta y el seguimiento de tu asunto.",
  ],
];
export const faqs = [
  [
    "¿Tengo que viajar a México?",
    "Dependerá del tipo de asunto. Nuestro equipo revisará qué etapas pueden atenderse a distancia y cuáles requieren tu presencia.",
  ],
  [
    "¿Puedo iniciar desde Estados Unidos?",
    "El contacto inicial puede realizarse a distancia. Cuéntanos tu situación para que el equipo determine cómo puede ayudarte.",
  ],
  [
    "¿Cómo envío mis documentos?",
    "El equipo te indicará qué necesita y el canal adecuado. No incluyas documentos ni datos sensibles en este prototipo.",
  ],
  [
    "¿Cómo sabré qué está pasando?",
    "La experiencia propuesta contempla actualizaciones y seguimiento mediante Mi Expediente BJG. En esta primera versión puedes explorar una demostración.",
  ],
  [
    "¿Y si no sé qué tipo de trámite necesito?",
    "No necesitas saberlo. Cuéntanos qué está pasando y te ayudaremos a identificar el siguiente paso.",
  ],
];
export const guides = [
  "¿Puedo vender una propiedad en México sin viajar?",
  "Vivo en Estados Unidos y heredé una casa. ¿Por dónde empiezo?",
  "¿Cómo preparo una conversación sobre un poder?",
  "Varios hermanos, una propiedad. ¿Qué necesitamos aclarar?",
];
export const states = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Ciudad de México",
  "Coahuila",
  "Colima",
  "Durango",
  "Estado de México",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "Michoacán",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatán",
  "Zacatecas",
];
