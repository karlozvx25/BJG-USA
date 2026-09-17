import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  RotateCcw,
  MessageCircle,
  Building2,
  House,
  Files,
  PenLine,
  Users,
} from "lucide-react";
import "./Chatbot.css";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: { label: string; action: string; icon?: React.ElementType; isOtro?: boolean }[];
  actionLink?: { text: string; href: string };
  chips?: string[];
}

const SECTION_2_OPTIONS = [
  {
    label: "Propiedades (Compra, venta, escrituras)",
    action: "propiedades",
    icon: House,
  },
  {
    label: "Herencias (Intestados, testamentos y sucesiones)",
    action: "herencias",
    icon: Files,
  },
  {
    label: "Poderes Notariales (Representación a distancia)",
    action: "poderes",
    icon: PenLine,
  },
  {
    label: "Familia y Estado Civil (Divorcios, pensiones, actas)",
    action: "familia",
    icon: Users,
  },
  {
    label: "Empresas y Negocios (Contratos, sociedades en México)",
    action: "empresas",
    icon: Building2,
  },
  {
    label: "Otro asunto (Cuéntanos tu caso particular)",
    action: "otro",
    icon: MessageCircle,
    isOtro: true,
  },
];

const KNOWLEDGE_RESPONSES: Record<string, { title: string; text: string; actionLinkText?: string; actionHref?: string; chips?: string[] }> = {
  propiedades: {
    title: "Asuntos Inmobiliarios y Propiedades en México",
    text: "En BJG te ayudamos a proteger, regularizar, comprar o vender tus bienes raíces en México sin que tengas que descuidar tu vida en EE.UU.\n\n• **Servicios frecuentes**: Regularización de escrituras, juicios de usucapión (prescripción positiva), cancelación de hipotecas, desalojo de invasores, compraventa remota mediante poder notarial.\n• **¿Debes viajar?**: En la gran mayoría de los casos podemos representarte mediante un poder notarial formalizado desde tu ciudad en EE.UU.\n• **Siguiente paso**: Revisar las escrituras o antecedentes de la propiedad.",
    actionLinkText: "Cuéntanos sobre tu propiedad",
    actionHref: "/#contacto",
    chips: ["¿Cómo vender sin viajar?", "¿Qué documentos necesito?", "Ver proceso BJG"],
  },
  herencias: {
    title: "Juicios Sucesorios y Herencias en México",
    text: "Resolver una herencia a la distancia puede ser complejo si hay múltiples familiares o no se dejó testamento.\n\n• **Juicios Intestamentarios**: Cuando no hay testamento, acreditamos el parentesco y tramitamos la apertura de la sucesión y adjudicación ante juzgados en México.\n• **Juicios Testamentarios**: Validación del testamento en el RENAT (Registro Nacional de Avisos de Testamento) y adjudicación de inmuebles.\n• **Acuerdo entre hermanos**: Negociamos y formalizamos cesiones de derechos hereditarios o partición de bienes.\n• **¿Debes viajar?**: No es indispensable; te representamos en todas las audiencias.",
    actionLinkText: "Consultar mi caso de herencia",
    actionHref: "/#contacto",
    chips: ["¿Cuánto tarda una sucesión?", "¿Pueden vender mi parte?", "Ver Guía de Herencias"],
  },
  poderes: {
    title: "Poderes Notariales para Trámites en México",
    text: "Un poder notarial te permite autorizar a un abogado de BJG o a un familiar en México para realizar actos jurídicos en tu nombre.\n\n• **Tipos de Poderes**: Poder para Pleitos y Cobranzas (juicios), Actos de Administración (gestión de rentas y trámites) y Actos de Dominio (vender o escriturar).\n• **¿Cómo se otorga desde EE.UU.?**:\n  1. Ante el Consulado General de México más cercano a tu ciudad.\n  2. Ante Notario Público de EE.UU., debidamente Apostillado (Apostilla de La Haya) y traducido por perito oficial en México.\n• Nosotros redactamos la minuta exacta para evitar rechazos notariales en México.",
    actionLinkText: "Preparar minuta de poder",
    actionHref: "/#contacto",
    chips: ["¿Consulado o Notario de EE.UU.?", "Requisitos para el poder", "Preguntas Frecuentes"],
  },
  familia: {
    title: "Derecho Familiar y Estado Civil en México",
    text: "Atendemos asuntos familiares con sensibilidad, discreción y total respaldo legal en territorio mexicano.\n\n• **Servicios**: Divorcio incausado (unilateral o de mutuo acuerdo) en México mientras resides en EE.UU., pensiones alimenticias, patria potestad y custodia.\n• **Actas y Registro Civil**: Rectificación o corrección de actas de nacimiento con errores en nombres o fechas, inserción de actas extranjeras y reconocimiento de paternidad.\n• Te evitamos traslados innecesarios y representamos tus intereses en juzgados de lo familiar.",
    actionLinkText: "Platícanos tu situación familiar",
    actionHref: "/#contacto",
    chips: ["¿Divorcio a distancia?", "Corregir acta en México", "Ver cómo funciona"],
  },
  empresas: {
    title: "Sociedades Mercantiles y Empresas en México",
    text: "Protegemos tus inversiones, contratos comerciales y negocios en México desde Estados Unidos.\n\n• **Servicios**: Constitución de empresas (S.A. de C.V., S.A.P.I., S. de R.L.), redacción y revisión de contratos mercantiles, asambleas de accionistas, poderes de representación y regularización legal.\n• Asesoría corporativa preventiva y litigio mercantil especializado.",
    actionLinkText: "Contactar a un especialista corporativo",
    actionHref: "/#contacto",
    chips: ["Crear empresa en México", "Contratos comerciales", "Poder mercantil"],
  },
  otro: {
    title: "Otros Asuntos Jurídicos en México",
    text: "No necesitas conocer el nombre técnico del trámite legal. Lo importante es que nos cuentes con tus propias palabras qué está pasando y qué objetivo deseas lograr.\n\n• El equipo de Bufete Jurídico Guadarrama revisará tu caso en sesión colegiada y te planteará las alternativas viables, tiempos y costos transparentes.",
    actionLinkText: "Describir mi caso al despacho",
    actionHref: "/#contacto",
    chips: ["¿En qué estados atienden?", "¿Tengo que viajar?", "Ver proceso de 4 pasos"],
  },
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initChat = () => {
    setMessages([
      {
        id: "welcome-1",
        sender: "bot",
        text: "¡Hola! Soy el asistente virtual de **Bufete Jurídico Guadarrama (BJG USA)**. Desde 1979 brindamos certeza legal en México a quienes viven y trabajan en Estados Unidos.\n\n¿En qué área podemos orientarte hoy?",
        options: SECTION_2_OPTIONS,
      },
    ]);
  };

  useEffect(() => {
    if (messages.length === 0) {
      initChat();
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleOptionClick = (action: string, label: string) => {
    const userMsg: Message = {
      id: String(Date.now()),
      sender: "user",
      text: label,
    };

    const resp = KNOWLEDGE_RESPONSES[action];
    let botMsg: Message;

    if (resp) {
      botMsg = {
        id: String(Date.now() + 1),
        sender: "bot",
        text: `### ${resp.title}\n\n${resp.text}`,
        actionLink: resp.actionLinkText && resp.actionHref ? { text: resp.actionLinkText, href: resp.actionHref } : undefined,
        chips: resp.chips,
      };
    } else {
      botMsg = {
        id: String(Date.now() + 1),
        sender: "bot",
        text: "Entiendo. Por favor cuéntanos más detalles o permítenos ponerte en contacto directo con uno de nuestros abogados.",
        actionLink: { text: "Cuéntanos tu caso", href: "/#contacto" },
      };
    }

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const handleChipClick = (chipText: string) => {
    handleSend(chipText);
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    if (!textToSend) setInput("");

    const userMsg: Message = {
      id: String(Date.now()),
      sender: "user",
      text: query,
    };

    // Knowledge matching logic based on entire BJG USA site content
    const lower = query.toLowerCase();
    let botResponseText = "";
    let actionLink: { text: string; href: string } | undefined;
    let chips: string[] | undefined;

    if (lower.includes("viajar") || lower.includes("viaje") || lower.includes("tengo que viajar") || lower.includes("ir a mexico") || lower.includes("ir a méxico")) {
      botResponseText = "### ¿Tengo que viajar a México?\n\n**No necesariamente.** La gran mayoría de los trámites y juicios pueden atenderse a distancia mediante representación legal y poderes notariales formalizados desde EE.UU. Nuestro equipo analiza cada etapa de tu asunto y te informará con total transparencia si alguna diligencia personal fuera estrictamente obligatoria.";
      actionLink = { text: "Revisar mi caso sin viajar", href: "/#contacto" };
      chips = ["¿Cómo hacer un poder?", "¿Cómo inicio desde EE.UU.?", "Servicios BJG"];
    } else if (lower.includes("poder") || lower.includes("notarial") || lower.includes("consulado") || lower.includes("apostill")) {
      const resp = KNOWLEDGE_RESPONSES.poderes;
      botResponseText = `### ${resp.title}\n\n${resp.text}`;
      actionLink = { text: resp.actionLinkText || "Preparar poder", href: resp.actionHref || "/#contacto" };
      chips = ["¿Consulado o Notario de EE.UU.?", "Propiedades en México", "Herencias"];
    } else if (lower.includes("herencia") || lower.includes("hered") || lower.includes("testamento") || lower.includes("sucesi") || lower.includes("intestad") || lower.includes("fallec")) {
      const resp = KNOWLEDGE_RESPONSES.herencias;
      botResponseText = `### ${resp.title}\n\n${resp.text}`;
      actionLink = { text: resp.actionLinkText || "Consultar herencia", href: resp.actionHref || "/#contacto" };
      chips = ["¿Qué pasa si no hay testamento?", "Poder notarial a distancia", "Ver Guía de Herencias"];
    } else if (lower.includes("propiedad") || lower.includes("casa") || lower.includes("terreno") || lower.includes("escritur") || lower.includes("inmueble") || lower.includes("vender") || lower.includes("comprar")) {
      const resp = KNOWLEDGE_RESPONSES.propiedades;
      botResponseText = `### ${resp.title}\n\n${resp.text}`;
      actionLink = { text: resp.actionLinkText || "Revisar propiedad", href: resp.actionHref || "/#contacto" };
      chips = ["¿Cómo vender sin viajar?", "Juicio sucesorio", "Hacer un poder"];
    } else if (lower.includes("divorcio") || lower.includes("familia") || lower.includes("acta") || lower.includes("pension") || lower.includes("matrimonio") || lower.includes("nacimiento")) {
      const resp = KNOWLEDGE_RESPONSES.familia;
      botResponseText = `### ${resp.title}\n\n${resp.text}`;
      actionLink = { text: resp.actionLinkText || "Consultar asunto familiar", href: resp.actionHref || "/#contacto" };
      chips = ["Corregir acta de nacimiento", "Divorcio a distancia", "Contactar equipo"];
    } else if (lower.includes("empresa") || lower.includes("sociedad") || lower.includes("negocio") || lower.includes("contrato")) {
      const resp = KNOWLEDGE_RESPONSES.empresas;
      botResponseText = `### ${resp.title}\n\n${resp.text}`;
      actionLink = { text: resp.actionLinkText || "Contactar especialista", href: resp.actionHref || "/#contacto" };
      chips = ["Crear empresa en México", "Poder notarial mercantil", "Contactar"];
    } else if (lower.includes("estado") || lower.includes("ciudad") || lower.includes("cobertura") || lower.includes("donde atienden") || lower.includes("jalisco") || lower.includes("michoacan") || lower.includes("cdmx") || lower.includes("mexico")) {
      botResponseText = "### Cobertura en las 32 entidades de México\n\nBufete Jurídico Guadarrama atiende asuntos en **todos los estados de la República Mexicana**, incluyendo Ciudad de México, Estado de México, Jalisco, Michoacán, Guanajuato, Puebla, Veracruz, Nuevo León, Chihuahua, Oaxaca, Zacatecas y más.\n\nAtendemos a residentes de toda la Unión Americana (Houston, Dallas, Los Ángeles, Chicago, San José, etc.).";
      actionLink = { text: "Iniciar consulta por estado", href: "/#contacto" };
      chips = ["Propiedades", "Herencias", "Poderes Notariales"];
    } else if (lower.includes("documento") || lower.includes("enviar") || lower.includes("papel")) {
      botResponseText = "### ¿Cómo envío mis documentos?\n\nPara la revisión inicial, el equipo te indicará qué documentos se requieren en formato digital a través de nuestros canales seguros. Si más adelante se requiere documentación original o apostillas, te guiaremos paso a paso con envíos certificados seguros.";
      actionLink = { text: "Iniciar revisión de documentos", href: "/#contacto" };
      chips = ["¿Tengo que viajar?", "Mi Expediente BJG", "Ver proceso"];
    } else if (lower.includes("proceso") || lower.includes("paso") || lower.includes("como funciona")) {
      botResponseText = "### Nuestro proceso en 4 pasos claros\n\n1. **Cuéntanos tu situación**: Sin tecnicismos, explícanos qué necesitas resolver.\n2. **Revisamos qué necesitas**: Análisis de tus antecedentes y viabilidad.\n3. **Te explicamos tus opciones**: Ruta jurídica con tiempos y costos precisos.\n4. **Avanzamos contigo**: Seguimiento continuo y transparente mediante Mi Expediente BJG.";
      actionLink = { text: "Dar el primer paso", href: "/#contacto" };
      chips = ["Propiedades", "Herencias", "Poderes", "Otro asunto"];
    } else if (lower.includes("expediente") || lower.includes("portal") || lower.includes("seguimiento")) {
      botResponseText = "### Mi Expediente BJG\n\nDiseñado para darte tranquilidad y control a la distancia. A través de la plataforma puedes consultar en cualquier momento:\n\n• Resumen y estatus de tu caso\n• Etapa jurídica actual y próximo paso\n• Documentos recibidos y emitidos\n• Contacto directo con tu abogado responsable";
      actionLink = { text: "Explorar portal demostrativo", href: "/#portal" };
      chips = ["Ver proceso", "Cuéntanos tu caso"];
    } else if (lower.includes("historia") || lower.includes("1979") || lower.includes("quienes son") || lower.includes("confianza") || lower.includes("despacho")) {
      botResponseText = "### Bufete Jurídico Guadarrama · Desde 1979\n\nCon más de cuatro décadas de trayectoria jurídica en México y trabajo colegiado, nuestro principio fundamental es **decir siempre la verdad al cliente** y brindar acompañamiento cercano a quienes construyen su vida lejos de México.";
      actionLink = { text: "Conocer al equipo", href: "/#equipo" };
      chips = ["Propiedades", "Herencias", "Poderes", "Familia"];
    } else {
      botResponseText = `Gracias por tu mensaje. En **Bufete Jurídico Guadarrama** podemos analizar tu situación específica y orientarte con total claridad sobre las leyes y procedimientos en México.\n\n¿Deseas explorar alguna de nuestras áreas principales o enviar tus datos para una llamada con el equipo?`;
      actionLink = { text: "Llenar formulario de contacto", href: "/#contacto" };
      chips = ["Propiedades", "Herencias", "Poderes Notariales", "Familia", "Otro"];
    }

    const botMsg: Message = {
      id: String(Date.now() + 1),
      sender: "bot",
      text: botResponseText,
      actionLink,
      chips,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const handleReset = () => {
    initChat();
  };

  return (
    <>
      {/* Floating Chatbot Toggle Button */}
      <button
        className="bjg-chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir Asistente Jurídico BJG"
      >
        <div className="bjg-chatbot-toggle-icon">
          <img src="/buhologo.svg" alt="Búho BJG" />
          <span className="bjg-chatbot-toggle-badge" />
        </div>
        <div className="bjg-chatbot-toggle-text">
          <span className="bjg-chatbot-toggle-title">BJG</span>
          <span className="bjg-chatbot-toggle-sub">USA</span>
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="bjg-chat-window" role="dialog" aria-modal="true">
          {/* Header */}
          <div className="bjg-chat-header">
            <div className="bjg-chat-header-info">
              <div className="bjg-chat-avatar">
                <img src="/buhologo.svg" alt="Búho BJG" />
              </div>
              <div className="bjg-chat-header-text">
                <div className="bjg-chat-title-stack">
                  <span className="bjg-chat-brand-top">BJG</span>
                  <span className="bjg-chat-brand-bottom">USA</span>
                </div>
                <p className="bjg-chat-status">
                  <span className="bjg-status-dot" /> En línea · Asistente Jurídico
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "4px" }}>
              <button
                className="bjg-chat-close-btn"
                onClick={handleReset}
                title="Reiniciar conversación"
              >
                <RotateCcw size={16} />
              </button>
              <button
                className="bjg-chat-close-btn"
                onClick={() => setIsOpen(false)}
                title="Cerrar chat"
              >
                <X size={19} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="bjg-chat-messages">
            {messages.map((m) => (
              <div key={m.id} className={`bjg-message-row ${m.sender}`}>
                {m.sender === "bot" && (
                  <div className="bjg-message-avatar">
                    <img src="/buhologo.svg" alt="Búho BJG" />
                  </div>
                )}
                <div className="bjg-message-bubble">
                  {m.text.split("\n\n").map((para, idx) => {
                    if (para.startsWith("### ")) {
                      return (
                        <h4 key={idx} style={{ color: "#dfd2be", margin: "0 0 6px 0", fontSize: "14px" }}>
                          {para.replace("### ", "")}
                        </h4>
                      );
                    }
                    return (
                      <p key={idx}>
                        {para.split("**").map((part, pidx) =>
                          pidx % 2 === 1 ? <strong key={pidx}>{part}</strong> : part
                        )}
                      </p>
                    );
                  })}

                  {/* Section 2 Options Buttons */}
                  {m.options && (
                    <div className="bjg-quick-options">
                      {m.options.map((opt) => {
                        const IconComponent = opt.icon;
                        return (
                          <button
                            key={opt.action}
                            className={`bjg-option-btn ${opt.isOtro ? "otro" : ""}`}
                            onClick={() => handleOptionClick(opt.action, opt.label)}
                          >
                            <span className="bjg-option-label">
                              {IconComponent && <IconComponent size={16} color="#b89a62" />}
                              {opt.label}
                            </span>
                            <ChevronRight size={15} opacity={0.6} />
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Action Link Button */}
                  {m.actionLink && (
                    <a
                      href={m.actionLink.href}
                      className="bjg-action-link-btn"
                      onClick={() => {
                        if (m.actionLink?.href.startsWith("/#")) {
                          const targetId = m.actionLink.href.replace("/#", "");
                          const elem = document.getElementById(targetId);
                          if (elem) {
                            elem.scrollIntoView({ behavior: "smooth" });
                            setIsOpen(false);
                          }
                        }
                      }}
                    >
                      {m.actionLink.text} <ArrowUpRight size={14} />
                    </a>
                  )}

                  {/* Follow-up Chips */}
                  {m.chips && m.chips.length > 0 && (
                    <div className="bjg-quick-chips">
                      {m.chips.map((chip, cidx) => (
                        <button
                          key={cidx}
                          className="bjg-chip"
                          onClick={() => handleChipClick(chip)}
                        >
                          <Sparkles size={11} style={{ marginRight: 4, display: "inline" }} />
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <div className="bjg-chat-footer">
            <form
              className="bjg-chat-input-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                type="text"
                className="bjg-chat-input"
                placeholder="Escribe tu pregunta o situación..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="bjg-chat-send-btn"
                disabled={!input.trim()}
                aria-label="Enviar pregunta"
              >
                <Send size={15} />
              </button>
            </form>
            <p className="bjg-chat-footer-note">
              Bufete Jurídico Guadarrama USA · Información y orientación jurídica
            </p>
          </div>
        </div>
      )}
    </>
  );
}
