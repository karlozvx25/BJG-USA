import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Menu,
  X,
  LockKeyhole,
  FileText,
  MessageSquare,
  CircleCheck,
  Video,
  Globe2,
  Users,
  Plus,
  ArrowLeft,
} from "lucide-react";
import { cities, faqs, guides, services, states, steps } from "./content";
import ScrollReveal from "./ScrollReveal";
import SpotlightCard from "./SpotlightCard";
import Chatbot from "./Chatbot";
const Arrow = () => <ArrowUpRight size={18} aria-hidden="true" />;
function CTA({
  children = "Cuéntanos tu caso",
  secondary = false,
  to = "/#contacto",
}: {
  children?: ReactNode;
  secondary?: boolean;
  to?: string;
}) {
  return (
    <Link className={`button ${secondary ? "secondary" : ""}`} to={to}>
      {children}
      <Arrow />
    </Link>
  );
}
function Heading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <ScrollReveal as="p" containerClassName="eyebrow" baseRotation={1} blurStrength={3}>
        {eyebrow}
      </ScrollReveal>
      <ScrollReveal as="h2" baseRotation={2} blurStrength={4}>
        {title}
      </ScrollReveal>
      {children && (
        <ScrollReveal as="p" containerClassName="lede" baseRotation={1} blurStrength={3}>
          {children}
        </ScrollReveal>
      )}
    </div>
  );
}
function Logo({ variant = "light", className = "" }: { variant?: "light" | "dark"; className?: string }) {
  return <span className={`official-logo official-logo--${variant} ${className}`}>
    <img src="/images/logos/guadarrama-gris-transparente.png" alt="Bufete Jurídico Guadarrama" width="3000" height="3000" decoding="async" />
  </span>;
}
function Brand() {
  return <Link to="/" className="brand" aria-label="Bufete Jurídico Guadarrama USA, inicio"><Logo /></Link>;
}
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
    if (location.hash) {
      setTimeout(
        () => document.getElementById(location.hash.slice(1))?.scrollIntoView(),
        50,
      );
    } else window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <>
      <a className="skip" href="#main">
        Saltar al contenido
      </a>
      <header className={scrolled || location.pathname !== "/" ? "scrolled" : ""}>
        <div className="header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Principal">
            <Link to="/#servicios">Qué necesitas resolver</Link>
            <Link to="/#proceso">Cómo funciona</Link>
            <Link to="/#equipo">Nosotros</Link>
            <Link to="/#guia">Guía BJG</Link>
          </nav>
          <Link className="portal-link" to="/mi-expediente">
            <LockKeyhole size={14} /> Mi expediente
          </Link>
          <div className="header-cta">
            <CTA />
          </div>
          <button
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Navegación móvil"
          >
            {[
              ["servicios", "Qué necesitas resolver"],
              ["proceso", "Cómo funciona"],
              ["equipo", "Nosotros"],
              ["testimonios", "Testimonios"],
              ["guia", "Guía BJG"],
              ["contacto", "Contacto"],
            ].map(([id, t]) => (
              <Link key={id} to={`/#${id}`}>
                {t}
                <Arrow />
              </Link>
            ))}
            <Link to="/mi-expediente">
              Mi expediente <LockKeyhole size={16} />
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
function Art({
  label = "Espacio para fotografía del equipo",
  compact = false,
}: {
  label?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`editorial-art ${compact ? "compact" : ""}`}
      role="img"
      aria-label={label}
    >
      <div className="art-grid" />
      <div className="arch arch-one" />
      <div className="arch arch-two" />
      <div className="art-official-brand" aria-hidden="true"><Logo /></div>
      <span className="art-label">
        {label}
        <small>FOTOGRAFÍA POR INCORPORAR</small>
      </span>
    </div>
  );
}
function Hero({
  city,
  service,
}: {
  city?: string;
  service?: (typeof services)[number];
}) {
  return (
    <section className="hero">
      <div className="hero-video-bg">
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/8k,_static_camera_202609081753.mp4"
        />
        <div className="hero-video-overlay" />
      </div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow light">
            <span />{" "}
            {city
              ? `ATENCIÓN PARA MEXICANOS EN ${city.toUpperCase()}`
              : "SERVICIOS JURÍDICOS EN MÉXICO"}
          </p>
          <p className="hero-context">
            Para mexicanos que viven en Estados Unidos
          </p>
          <h1>
            {service
              ? `${service.label} en México.`
              : city
                ? `Certeza legal ${city}.`
                : "Certeza Legal"}{" "}
            <em>
              {service
                ? "Un camino claro, estés donde estés."
                : "En ambos lados de la frontera."}
            </em>
          </h1>
          <div className="hero-actions">
            <CTA />
            <Link to="/#proceso" className="text-link">
              Ver cómo funciona <ArrowRight size={17} />
            </Link>
          </div>
          <div className="hero-notes">
            <span>
              <Check size={14} /> Atención remota
            </span>
            <span>
              <Check size={14} /> Abogados en México
            </span>
          </div>
        </div>
        <div className="hero-bottom-right">
          <p className="hero-statement">
            {service ? (
              service.description
            ) : (
              <>
                <span>Protegemos tu patrimonio, familia y empresa en México</span>{" "}
                <span className="hero-statement-line2">
                  mientras tú continúas construyendo tu vida en Estados Unidos.
                </span>
              </>
            )}
          </p>
        </div>
      </div>
      <div className="hero-baseline container">
        <span>LA LEY ESTÁ DE TU LADO. NOSOTROS TAMBIÉN.</span>
        <a href="#servicios">
          DESCUBRE CÓMO <span>↓</span>
        </a>
      </div>
    </section>
  );
}
function Proof() {
  return (
    <div className="proof">
      <div className="container proof-grid">
        {[
          [Globe2, "Desde 1979", "Una historia entre generaciones"],
          [
            Video,
            "Atención a distancia",
            "Una conversación, estés donde estés",
          ],
          [FileText, "Seguimiento claro", "Conoce el siguiente paso"],
          [UsersIcon, "Equipo jurídico", "Personas trabajando en México"],
        ].map(([Icon, t, d]) => {
          const I = Icon as typeof Globe2;
          return (
            <ScrollReveal as="div" key={String(t)} baseRotation={0.5} blurStrength={2} containerClassName="proof-item">
              <I size={24} />
              <div>
                <strong>{String(t)}</strong>
                <span>{String(d)}</span>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
const UsersIcon = Users;
function ServiceCards() {
  return (
    <section id="servicios" className="section container">
      <div className="section-top">
        <Heading
          eyebrow="EMPECEMOS POR LO QUE IMPORTA"
          title="¿Qué necesitas resolver en México?"
        />
        <ScrollReveal as="p" containerClassName="section-aside" baseRotation={1} blurStrength={3}>
          No necesitas saber cómo se llama tu problema legal. Cuéntanos lo que
          pasa; nosotros te ayudamos a identificar el camino.
        </ScrollReveal>
      </div>
      <div className="services-grid">
        {services.map((s, i) => (
          <SpotlightCard
            key={s.slug}
            as={Link}
            to={`/servicios/${s.slug}`}
            className="service-card"
            spotlightColor="rgba(255, 255, 255, 0.22)"
          >
            <div className="card-top">
              <s.icon size={29} strokeWidth={1.3} />
              <span>0{i + 1}</span>
            </div>
            <ScrollReveal as="h3" baseRotation={1.5} blurStrength={3}>
              {s.title}
            </ScrollReveal>
            <ScrollReveal as="p" baseRotation={1} blurStrength={2}>
              {s.description}
            </ScrollReveal>
            <span className="card-link">
              Ver opciones <Arrow />
            </span>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
function Process() {
  return (
    <section id="proceso" className="section container">
      <Heading
        eyebrow="UN PROCESO MÁS CLARO"
        title="Resolver en México puede ser más simple."
      />
      <div className="process-grid">
        {steps.map(([t, d], i) => (
          <ScrollReveal as="div" key={t} baseRotation={1} blurStrength={3} containerClassName="process-step-item">
            <span className="step-number">0{i + 1}</span>
            <ScrollReveal as="h3" baseRotation={1.5} blurStrength={3}>
              {t}
            </ScrollReveal>
            <ScrollReveal as="p" baseRotation={1} blurStrength={2}>
              {d}
            </ScrollReveal>
          </ScrollReveal>
        ))}
      </div>
      <CTA />
    </section>
  );
}
function Dashboard() {
  const [tab, setTab] = useState("Resumen");
  return (
    <div className="dashboard">
      <div className="dashboard-head">
        <strong>
          <Logo variant="dark" className="portal-logo" /> <span>/ Mi expediente</span>
        </strong>
        <span className="demo-badge">DEMOSTRACIÓN</span>
      </div>
      <div
        className="dashboard-tabs"
        role="tablist"
        aria-label="Vista del expediente"
      >
        {["Resumen", "Documentos", "Mensajes"].map((t) => (
          <button
            key={t}
            id={`tab-${t}`}
            role="tab"
            aria-controls="dashboard-panel"
            aria-selected={tab === t}
            tabIndex={tab === t ? 0 : -1}
            onKeyDown={(e) => {
              const tabs = ["Resumen", "Documentos", "Mensajes"];
              let next = t;
              if (e.key === "ArrowRight")
                next = tabs[(tabs.indexOf(t) + 1) % 3];
              else if (e.key === "ArrowLeft")
                next = tabs[(tabs.indexOf(t) + 2) % 3];
              else if (e.key === "Home") next = tabs[0];
              else if (e.key === "End") next = tabs[2];
              else return;
              e.preventDefault();
              setTab(next);
              document.getElementById(`tab-${next}`)?.focus();
            }}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div
        className="dashboard-body"
        id="dashboard-panel"
        role="tabpanel"
        aria-labelledby={`tab-${tab}`}
      >
        {tab === "Resumen" ? (
          <>
            <div className="case-title">
              <div>
                <small>EXPEDIENTE BJG-2048 · EJEMPLO</small>
                <h3>Tu patrimonio en México</h3>
              </div>
              <span className="pill">En proceso</span>
            </div>
            <div className="case-progress">
              {["Recibido", "Documentación", "Revisión", "Proceso"].map(
                (t, i) => (
                  <div key={t}>
                    <span className={i < 2 ? "done" : ""}>
                      {i < 2 ? <Check size={13} /> : i + 1}
                    </span>
                    <small>{t}</small>
                  </div>
                ),
              )}
            </div>
            <div className="next-action">
              <small>EL SIGUIENTE PASO</small>
              <strong>Revisión de documentación notarial</strong>
              <p>
                Tu equipo revisará los documentos y compartirá una
                actualización.
              </p>
            </div>
            <div className="dashboard-stats">
              <span>
                <FileText size={17} /> 6 documentos de ejemplo
              </span>
              <span>
                <MessageSquare size={17} /> 2 actualizaciones
              </span>
            </div>
          </>
        ) : tab === "Documentos" ? (
          <>
            <h3>Documentos del expediente</h3>
            <p>Archivos ilustrativos; no contienen información real.</p>
            {["Identificación", "Escritura", "Solicitud de revisión"].map(
              (t) => (
                <div className="document-row" key={t}>
                  <FileText size={18} />
                  {t}
                  <span>Ejemplo</span>
                </div>
              ),
            )}
          </>
        ) : (
          <>
            <h3>Actualizaciones del equipo</h3>
            <div className="next-action">
              <strong>Documentación recibida</strong>
              <p>
                El equipo tiene los documentos de ejemplo para iniciar su
                revisión.
              </p>
            </div>
            <div className="next-action">
              <strong>Bienvenido a tu expediente</strong>
              <p>
                Aquí podrás conocer avances y próximos pasos. Esta es una
                demostración sin conexión a casos reales.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
function Portal() {
  return (
    <section className="portal-section" id="expediente">
      <div className="container portal-grid">
        <div>
          <ScrollReveal as="p" containerClassName="eyebrow light" baseRotation={1} blurStrength={2}>
            TRANSPARENCIA DIGITAL
          </ScrollReveal>
          <ScrollReveal as="h2" baseRotation={2} blurStrength={4}>
            Tu caso.
            <br />
            <em>Siempre visible.</em>
          </ScrollReveal>
          <ScrollReveal as="p" baseRotation={1} blurStrength={3}>
            Cuando estás lejos, saber qué está pasando importa. Un espacio para
            tus documentos, avances y próximos pasos.
          </ScrollReveal>
          <ul className="check-list">
            <li>
              <Check /> Información en un solo lugar
            </li>
            <li>
              <Check /> Actualizaciones fáciles de entender
            </li>
            <li>
              <Check /> Claridad sobre lo que sigue
            </li>
          </ul>
          <CTA to="/mi-expediente" secondary>
            Explorar Mi Expediente
          </CTA>
          <small className="portal-note">
            Vista previa del portal que estamos construyendo.
          </small>
        </div>
        <Dashboard />
      </div>
    </section>
  );
}
function Contact() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (step > 1)
      form.current
        ?.querySelector<HTMLElement>(
          "fieldset:not([hidden]) input, fieldset:not([hidden]) textarea, fieldset:not([hidden]) select",
        )
        ?.focus();
  }, [step]);
  function advance(e: FormEvent) {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
    else setDone(true);
  }
  return (
    <section id="contacto" className="section contact-section">
      <div className="container contact-grid">
        <div>
          <ScrollReveal as="p" containerClassName="eyebrow light" baseRotation={1} blurStrength={2}>
            TU SIGUIENTE PASO EMPIEZA AQUÍ
          </ScrollReveal>
          <ScrollReveal as="h2" baseRotation={2} blurStrength={4}>
            La distancia no debería <em>detenerte.</em>
          </ScrollReveal>
          <ScrollReveal as="p" baseRotation={1} blurStrength={3}>
            Cuéntanos qué necesitas resolver en México. No necesitas usar
            términos jurídicos.
          </ScrollReveal>
          <ScrollReveal as="span" containerClassName="contact-signature" baseRotation={1} blurStrength={2}>
            México sigue cerca.
          </ScrollReveal>
        </div>
        <div className="contact-form">
          {done ? (
            <div role="status">
              <CircleCheck size={38} />
              <h3>Tu ejemplo está listo.</h3>
              <p>
                Has completado la demostración. No se envió ni guardó tu
                información. El canal de atención se habilitará al conectar el
                sitio con BJG.
              </p>
              <button
                className="button"
                onClick={() => {
                  setDone(false);
                  setStep(1);
                }}
              >
                Volver a probar <Arrow />
              </button>
            </div>
          ) : (
            <form ref={form} onSubmit={advance}>
              <div className="form-top">
                <span>PASO {step} DE 3</span>
                <span>DEMO · SIN ENVÍO</span>
              </div>
              <progress value={step} max={3} aria-label={`Paso ${step} de 3`} />
              <h3>Cuéntanos qué está pasando.</h3>
              <p className="form-notice">
                Prototipo: usa datos ficticios. No se enviará ni almacenará
                información.
              </p>
              <fieldset hidden={step !== 1}>
                <legend>Tu asunto en México</legend>
                <label>
                  ¿Qué necesitas resolver?
                  <select required={step === 1} name="service" defaultValue="">
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    {services.map((s) => (
                      <option key={s.slug}>{s.label}</option>
                    ))}
                  </select>
                </label>
                <label>
                  ¿En qué estado está tu asunto?
                  <select required={step === 1} name="state" defaultValue="">
                    <option value="" disabled>
                      Selecciona un estado
                    </option>
                    {states.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                    <option>No estoy seguro</option>
                  </select>
                </label>
              </fieldset>
              <fieldset hidden={step !== 2}>
                <legend>Un poco de contexto</legend>
                <label>
                  Cuéntanos brevemente qué está pasando
                  <textarea
                    name="description"
                    required={step === 2}
                    minLength={10}
                    maxLength={1500}
                    rows={4}
                    placeholder="Describe una situación de ejemplo…"
                  />
                </label>
              </fieldset>
              <fieldset hidden={step !== 3}>
                <legend>Cómo contactarte</legend>
                <label>
                  Nombre
                  <input name="name" required={step === 3} autoComplete="off" />
                </label>
                <label>
                  Correo electrónico
                  <input
                    name="email"
                    type="email"
                    required={step === 3}
                    autoComplete="off"
                  />
                </label>
                <label>
                  Teléfono
                  <input name="phone" type="tel" autoComplete="off" />
                </label>
                <label>
                  Ciudad actual
                  <input name="city" required={step === 3} />
                </label>
                <label>
                  ¿Cómo prefieres que hablemos contigo?
                  <select name="channel">
                    <option>Correo</option>
                    <option>WhatsApp</option>
                    <option>Llamada</option>
                  </select>
                </label>
              </fieldset>
              <div className="form-actions">
                {step > 1 && (
                  <button
                    type="button"
                    className="back-button"
                    onClick={() => setStep(step - 1)}
                  >
                    <ArrowLeft size={16} /> Atrás
                  </button>
                )}
                <button className="button" type="submit">
                  {step === 3 ? "Completar demostración" : "Continuar"}
                  <ArrowRight size={17} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
function Home() {
  return (
    <>
      <Hero />
      <div className="main-content-flow">
        <Proof />
        <ServiceCards />
        <section className="emotional">
        <div className="container emotional-grid">
          <ScrollReveal as="p" containerClassName="eyebrow light" baseRotation={1} blurStrength={2}>
            CERTEZA A DISTANCIA
          </ScrollReveal>
          <div>
            <ScrollReveal as="h2" baseRotation={2} blurStrength={4}>
              Estar lejos no debería significar <em>perder el control.</em>
            </ScrollReveal>
            <div className="emotional-copy">
              <ScrollReveal as="p" baseRotation={1} blurStrength={2}>
                Llamadas que nadie responde. Documentos que no llegan. Procesos
                que nadie explica. Resolver desde otro país puede ser
                frustrante.
              </ScrollReveal>
              <ScrollReveal as="p" baseRotation={1} blurStrength={2}>
                En BJG creemos que debe funcionar diferente: con personas que
                escuchan, explicaciones claras y un siguiente paso visible.
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
      <Process />
      <Portal />
      <section className="section container" id="equipo">
        <div className="section-top">
          <Heading
            eyebrow="PERSONAS DETRÁS DEL DERECHO"
            title="Detrás de cada caso hay una historia."
          />
          <ScrollReveal as="p" containerClassName="section-aside" baseRotation={1} blurStrength={3}>
            Y detrás de cada expediente, personas trabajando para resolverla.
            Experiencia jurídica, análisis y acompañamiento personal.
          </ScrollReveal>
        </div>
        <div className="team-grid">
          {[
            "Escuchar antes de actuar.",
            "Una estrategia con perspectiva.",
            "Acompañarte en cada paso.",
          ].map((t, i) => (
            <article className="team-card" key={t}>
              <Art
                compact
                label={`Retrato del equipo · ${String(i + 1).padStart(2, "0")}`}
              />
              <ScrollReveal as="h3" baseRotation={1.5} blurStrength={3}>{t}</ScrollReveal>
              <ScrollReveal as="p" baseRotation={1} blurStrength={2}>Perfil y credenciales por incorporar.</ScrollReveal>
            </article>
          ))}
        </div>
      </section>
      <section className="collegiate container">
        <div
          className="collegiate-art"
          aria-label="Análisis, estrategia y seguimiento conectados"
        >
          <span>Análisis</span>
          <div className="collegiate-center">Tu caso</div>
          <span>Estrategia</span>
          <span>Seguimiento</span>
        </div>
        <div>
          <ScrollReveal as="p" containerClassName="eyebrow" baseRotation={1} blurStrength={2}>
            TRABAJO COLEGIADO
          </ScrollReveal>
          <ScrollReveal as="h2" baseRotation={2} blurStrength={4}>
            Más perspectivas.
            <br />
            Una misma dirección.
          </ScrollReveal>
          <ScrollReveal as="p" baseRotation={1} blurStrength={2}>
            Un caso complejo no debería depender de una sola opinión. Cuando un
            asunto lo requiere, el equipo puede analizarlo desde diferentes
            perspectivas jurídicas para construir una estrategia mejor
            fundamentada.
          </ScrollReveal>
        </div>
      </section>
      <section className="section container" id="testimonios">
        <Heading
          eyebrow="HISTORIAS QUE NOS CONECTAN"
          title="Cuando la distancia deja de ser un problema."
        />
        <div className="testimonial">
          <div className="testimonial-mark">“</div>
          <div>
            <span className="demo-badge">
              ESPACIO EDITORIAL · TESTIMONIO PENDIENTE
            </span>
            <ScrollReveal as="h3" baseRotation={1} blurStrength={2}>
              La tranquilidad de saber qué sigue.
            </ScrollReveal>
            <ScrollReveal as="p" baseRotation={1} blurStrength={2}>
              Aquí compartiremos experiencias de clientes, con su autorización:
              qué necesitaban resolver en México, cómo vivieron el proceso y qué
              cambió para ellos.
            </ScrollReveal>
            <span className="muted">
              Video subtitulado · Nombre · Ciudad · Tipo de asunto
            </span>
          </div>
          <div className="video-placeholder">
            <Video size={36} strokeWidth={1} />
            <span>
              Una historia real,
              <br />
              próximamente.
            </span>
          </div>
        </div>
      </section>
      <section className="authority">
        <div className="container authority-grid">
          <Heading
            eyebrow="EXPERIENCIA Y TRANSPARENCIA"
            title="La confianza se construye con hechos."
          />
          <div>
            <span className="heritage-year">1979</span>
            <p>El inicio de nuestra historia, según el brief de marca.</p>
          </div>
          <div>
            <FileText size={28} />
            <ScrollReveal as="h3" baseRotation={1.5} blurStrength={3}>
              Cada resultado tiene una historia.
            </ScrollReveal>
            <ScrollReveal as="p" baseRotation={1} blurStrength={2}>
              Los casos y cifras se incorporarán con evidencia verificable. Cada
              asunto tiene circunstancias propias.
            </ScrollReveal>
          </div>
        </div>
      </section>
      <section className="section container legacy">
        <div className="legacy-art">
          <span>1979</span>
          <div />
          <span>Hoy</span>
          <small>ARCHIVO HISTÓRICO · FOTOGRAFÍAS POR INCORPORAR</small>
        </div>
        <div>
          <ScrollReveal as="p" containerClassName="eyebrow" baseRotation={1} blurStrength={2}>
            UNA HISTORIA DE CONFIANZA
          </ScrollReveal>
          <ScrollReveal as="h2" baseRotation={2} blurStrength={4}>
            De una generación <em>a otra.</em>
          </ScrollReveal>
          <ScrollReveal as="p" baseRotation={1} blurStrength={2}>
            La práctica jurídica ha cambiado. La tecnología y la forma de
            comunicarnos también. Pero hay algo que no debería cambiar:
          </ScrollReveal>
          <ScrollReveal as="h3" baseRotation={1.5} blurStrength={3}>
            Decir la verdad al cliente.
          </ScrollReveal>
          <ScrollReveal as="p" baseRotation={1} blurStrength={2}>
            Hoy esa convicción nos guía para acompañar a quienes construyen su
            vida lejos de México.
          </ScrollReveal>
        </div>
      </section>
      <section className="guide-section" id="guia">
        <div className="container section">
          <Heading
            eyebrow="GUÍA BJG · ENTENDER ANTES DE DECIDIR"
            title="Un poco de claridad hace la diferencia."
          />
          <div className="guides-grid">
            {guides.map((t, i) => (
              <Link to={`/guia/${i + 1}`} className="guide-card" key={t}>
                <div className={`guide-cover cover-${i}`}>
                  <FileText size={52} strokeWidth={0.7} />
                  <span>GUÍA / 0{i + 1}</span>
                </div>
                <small>
                  {["PATRIMONIO", "HERENCIAS", "REPRESENTACIÓN", "FAMILIA"][i]}{" "}
                  · BORRADOR EDITORIAL
                </small>
                <ScrollReveal as="h3" baseRotation={1.5} blurStrength={3}>{t}</ScrollReveal>
                <span className="card-link">
                  Explorar tema <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
        <section id="faq" className="faq-section">
          <div className="faq-video-bg">
            <video
              autoPlay
              loop
              muted
              playsInline
              src="/Fix_image_with_moving_clouds_202609081731.mp4"
            />
            <div className="faq-video-overlay" />
          </div>
          <div className="container faq-grid">
            <Heading
              eyebrow="HABLEMOS CON CLARIDAD"
              title="Tus preguntas, un buen comienzo."
            />
            <div className="faq-list">
              {faqs.map(([q, a]) => (
                <details key={q}>
                  <summary>
                    {q}
                    <Plus size={19} />
                  </summary>
                  <ScrollReveal as="p" baseRotation={1} blurStrength={2}>{a}</ScrollReveal>
                </details>
              ))}
            </div>
          </div>
        </section>
        <Contact />
      </div>
    </>
  );
}
function Landing() {
  const { city, service } = useParams();
  const found = services.find((s) => s.slug === service);
  if ((city && !cities[city]) || (service && !found)) return <NotFound />;

  const descriptions: Record<string, string> = {
    "propiedades-mexico":
      "Empezamos por entender tu situación inmobiliaria en México. El equipo revisará escrituras, títulos, contratos o gravámenes y te explicará las opciones, documentos y próximos pasos para regularizar, comprar o vender sin necesidad de viajar.",
    "herencias-mexico":
      "Empezamos por entender tu situación sucesoria en México. El equipo revisará si existe testamento o si se requiere un juicio intestamentario, explicando las opciones para adjudicar o regularizar los bienes heredados.",
    "poderes-mexico":
      "Empezamos por entender qué trámite o acto jurídico necesitas autorizar en México. El equipo preparará la minuta exacta para tu poder notarial consular o apostillado en Estados Unidos con validez plena.",
    "familia-mexico":
      "Empezamos por entender tu situación familiar o de estado civil en México. El equipo analizará las opciones para divorcio a distancia, pensión alimenticia, custodia o corrección de actas en el Registro Civil.",
    "empresas-mexico":
      "Empezamos por entender las necesidades de tu empresa o negocio en México. El equipo estructurará contratos comerciales, poderes mercantiles o constitución de sociedades con total certeza y blindaje legal.",
    "otros-asuntos":
      "Empezamos por entender tu situación particular. El equipo revisará tu caso en sesión colegiada y te explicará las opciones jurídicas, documentos y próximos pasos que correspondan.",
  };

  const serviceDesc = found
    ? descriptions[found.slug] || found.description
    : "Empezamos por entender tu situación...";

  const imageSrc = found ? `/images/services/${found.slug}.jpg` : "/images/services/propiedades-mexico.jpg";

  return (
    <div className="landing-emergence-page">
      <div className="container landing-emergence-container">
        <div className="landing-emergence-grid">
          {/* Columna Izquierda: Imagen del Caso y Botón Regresar */}
          <ScrollReveal as="div" containerClassName="landing-emergence-image-col" baseRotation={1} blurStrength={2}>
            <div className="landing-emergence-image-wrapper">
              <img
                src={imageSrc}
                alt={found ? found.title : "Bufete Jurídico Guadarrama"}
                className="landing-emergence-img"
                loading="eager"
              />
              <div className="landing-image-gloss" />
            </div>

            {/* Botón regresar abajo de la imagen */}
            <Link
              to="/#servicios"
              className="service-return-btn"
              aria-label="Regresar a servicios"
            >
              <ArrowLeft size={16} />
              <span>Regresar a Servicios</span>
            </Link>
          </ScrollReveal>

          {/* Columna Derecha: Texto y Contenido */}
          <div className="landing-emergence-text-col">
            <ScrollReveal as="p" containerClassName="eyebrow" baseRotation={1} blurStrength={2}>
              ATENCIÓN JURÍDICA EN MÉXICO
            </ScrollReveal>
            <ScrollReveal as="h1" containerClassName="landing-emergence-title" baseRotation={1.5} blurStrength={3}>
              {found ? found.title : "México sigue cerca."}
            </ScrollReveal>
            <ScrollReveal as="p" containerClassName="landing-emergence-desc" baseRotation={1} blurStrength={2}>
              {serviceDesc}
              {city ? ` Atención para residentes de ${cities[city]}.` : ""}
            </ScrollReveal>
            <ScrollReveal as="p" containerClassName="landing-emergence-disclaimer" baseRotation={1} blurStrength={2}>
              La atención por ciudad se refiere al lugar de residencia del cliente;
              no implica una oficina ni representación jurídica en Estados Unidos.
            </ScrollReveal>
            <div style={{ marginTop: "32px" }}>
              <CTA />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Guide() {
  const { id } = useParams();
  const title = guides[Number(id) - 1];
  if (!title) return <NotFound />;
  return (
    <section className="section container narrow">
      <Link to="/#guia" className="text-link">
        <ArrowLeft size={16} /> Guía BJG
      </Link>
      <ScrollReveal as="p" containerClassName="eyebrow" baseRotation={1} blurStrength={2}>
        BORRADOR EDITORIAL · PENDIENTE DE REVISIÓN
      </ScrollReveal>
      <ScrollReveal as="h1" baseRotation={1.5} blurStrength={3}>
        {title}
      </ScrollReveal>
      <ScrollReveal as="p" baseRotation={1} blurStrength={2}>
        Para iniciar una conversación con el equipo, puedes organizar estas
        preguntas:
      </ScrollReveal>
      <ul className="article-list">
        <li>¿Qué necesito resolver y qué me preocupa más?</li>
        <li>¿En qué lugar de México está relacionado mi asunto?</li>
        <li>¿Quiénes están involucrados y qué información tengo disponible?</li>
        <li>¿Hay alguna fecha importante que deba mencionar?</li>
      </ul>
      <ScrollReveal as="p" baseRotation={1} blurStrength={2}>
        El contenido específico de esta guía se incorporará después de su
        revisión por el despacho. No sustituye el análisis de tu situación.
      </ScrollReveal>
      <CTA />
    </section>
  );
}
function Legal() {
  return (
    <section className="section container narrow">
      <ScrollReveal as="p" containerClassName="eyebrow" baseRotation={1} blurStrength={2}>
        INFORMACIÓN DEL PROTOTIPO
      </ScrollReveal>
      <ScrollReveal as="h1" baseRotation={1.5} blurStrength={3}>
        Transparencia desde el primer paso.
      </ScrollReveal>
      <ScrollReveal as="p" baseRotation={1} blurStrength={2}>
        La información presentada tiene fines informativos y no constituye
        asesoría jurídica personalizada. La atención de cada asunto dependerá de
        sus circunstancias y de la formalización de la relación profesional.
      </ScrollReveal>
      <ScrollReveal as="h2" baseRotation={1.5} blurStrength={3}>
        Privacidad y términos
      </ScrollReveal>
      <ScrollReveal as="p" baseRotation={1} blurStrength={2}>
        Esta demostración no envía formularios ni guarda sus datos en un
        servidor o en el navegador. No incluye analítica ni autenticación. Los
        avisos definitivos, la identidad del responsable y los canales para
        ejercer derechos deben incorporarse antes de habilitar la recepción de
        datos.
      </ScrollReveal>
      <Link to="/" className="text-link">
        Volver al inicio <Arrow />
      </Link>
    </section>
  );
}
function NotFound() {
  return (
    <section className="section container narrow">
      <p className="eyebrow">404</p>
      <h1>No encontramos esta página.</h1>
      <CTA to="/">Volver al inicio</CTA>
    </section>
  );
}
function Footer() {
  return (
    <>
      <footer>
        <div className="container footer-grid">
          <div>
            <Brand />
            <p>
              La ley está de tu lado.
              <br />
              Nosotros también.
            </p>
            <span className="footer-signature">México sigue cerca.</span>
          </div>
          <div>
            <h3>Qué necesitas resolver</h3>
            {services.map((s) => (
              <Link key={s.slug} to={`/servicios/${s.slug}`}>
                {s.label}
              </Link>
            ))}
          </div>
          <div>
            <h3>Conoce BJG</h3>
            <Link to="/#equipo">Nuestro equipo</Link>
            <Link to="/#testimonios">Testimonios</Link>
            <Link to="/#guia">Guía BJG</Link>
            <Link to="/#faq">Preguntas frecuentes</Link>
            <Link to="/mi-expediente">Mi expediente</Link>
          </div>
          <div>
            <h3>Desde tu ciudad</h3>
            {Object.entries(cities).map(([k, v]) => (
              <Link key={k} to={`/ciudades/${k}`}>
                {v}
              </Link>
            ))}
          </div>
        </div>
        <div className="container footer-bottom">
          <p>
            © {new Date().getFullYear()} BJG USA. Servicios jurídicos en México.
          </p>
          <div>
            <Link to="/legal">Privacidad</Link>
            <Link to="/legal">Términos y aviso legal</Link>
          </div>
        </div>
        <p className="container legal-note">
          La información del sitio no constituye asesoría jurídica
          personalizada. Prototipo: fotografías, testimonios y credenciales
          pendientes de incorporación.
        </p>
      </footer>
      <Link className="mobile-cta button" to="/#contacto">
        Cuéntanos tu caso <Arrow />
      </Link>
    </>
  );
}
export default function App() {
  const location = useLocation();
  useEffect(() => {
    document.title =
      location.pathname === "/"
        ? "BJG USA · México sigue cerca"
        : location.pathname.includes("mi-expediente")
          ? "Mi Expediente · Demo BJG USA"
          : "Servicios jurídicos en México · BJG USA";
  }, [location.pathname]);
  return (
    <>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios/:service" element={<Landing />} />
          <Route path="/ciudades/:city" element={<Landing />} />
          <Route path="/:city/:service" element={<Landing />} />
          <Route path="/guia/:id" element={<Guide />} />
          <Route
            path="/mi-expediente"
            element={
              <section className="section container portal-page">
                <Heading
                  eyebrow="MI EXPEDIENTE BJG"
                  title="Claridad, en un solo lugar."
                >
                  Demostración interactiva. No es un acceso a expedientes
                  reales.
                </Heading>
                <Dashboard />
              </section>
            }
          />
          <Route path="/legal" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
