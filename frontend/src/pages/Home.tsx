import { Github, Linkedin, Mail, Menu } from "lucide-react";
import { useEffect } from "react";
import Footer from "../components/footer";

const experiences = [
  {
    role: "Software engineer",
    company: "Galadrim",
    period: "Janvier 2024 - Aujourd'hui",
    description: `Développement d'outils internes pour le groupement de pharmacies Leadersanté (1000+ établissements), dont un outil de crossposting multi-plateforme (Facebook, Instagram, Google), et moteur de recherche distribué de factures (OpenSearch + PostgreSQL) avec OCR automatisé. Conception et maintenance d'une application mobile sociale dans le secteur du café de spécialité (700 utilisateurs actifs).`,
    stack: [
      "NodeJS",
      "React",
      "React-native",
      "NestJS",
      "PostgreSQL",
      "AWS",
      "Terraform",
    ],
  },
  {
    role: "Ingénieur logiciel - Stage de fin d'études",
    company: "Orange Innovation",
    period: "Avril 2023 - Septembre 2023",
    description:
      "Développement d'une solution logicielle de visualisation de topologie réseau. Manipulation des protocoles réseau (BGP, IS-IS, IGP, Flex-Algo), et intégration back-end (Python + PostgreSQL). Déploiement et test de cette solution sur environnement virtualisé.",
    stack: ["Python", "PostgreSQL", "VueJS", "Docker"],
  },
  {
    role: "Césure - stage et CDD - Ingénieur logiciel",
    company: "Polyconseil",
    period: "Septembre 2021 - Août 2022",
    description:
      "Développement et maintenance pour le compte d'une agence gouvernementale (ANTAI) d'une des briques logicielles de traitement automatisé des infractions.",
    stack: ["Java", "Spring", "Oracle DB", "Angular", "Oracle DB"],
  },
];

const education = [
  {
    title:
      "Diplôme d'ingénieur généraliste - spécialisation ingénierie logicielle",
    school: "IMT Atlantique, Brest - Institut Mines-Télécom",
    period: "2016 - 2018",
    details:
      " Spécialité ingénierie logicielle. Cours notables: architecture microservices, cloud computing, compilation. Tronc commun: mathématiques, physique théorique",
  },
  {
    title: "Classe préparatoire aux grandes écoles (CPGE) - MPSI/MP*",
    school: "Lycée Faidherbe, Lille",
    period: "2017 - 2018",
  },
];

const skillGroups = [
  {
    name: "Langages",
    skills: ["TypeScript", "JavaScript", "Python", "Go", "Rust", "Java"],
  },
  {
    name: "Outils",
    skills: ["Docker", "AWS", "Terraform", "PostgreSQL", "Nginx"],
  },
  {
    name: "Langues",
    skills: [
      "Français (natif)",
      "Anglais (professionnel)",
      "Allemand (basique)",
    ],
  },
];

const projects = [
  {
    name: "Moteur de recherche full-text sur stockage objet S3 compatible",
    description:
      "Moteur de recherche léger pour indexer des fichiers texte stockés sur un bucket S3-compatible (MinIO). Backend en Go pour la gestion de l’index et de l’API HTTP, interface React pour la recherche et le téléchargement des objets.",
    stack: ["Go", "S3/MinIO", "React"],
    github: "https://github.com/remiCzn/s3-search-engine",
    demo: "https://s3-search.remic.fr",
  },
  {
    name: "Filtrage d’e-mails et externalisation de pièces jointes via MinIO",
    description:
      "Système de filtrage d'e-mails intégré à Postfix, redirigeant les pièces jointes volumineuses vers un stockage objet, via une API Flask (Python), avec génération de liens sécurisés et service de purge automatisée. Projet réalisé dans le cadre de mes études",
    stack: ["Flask", "Postfix", "MinIO", "Docker", "Python"],
    github: "https://github.com/username/flow-builder",
  },
];

const contacts = [
  {
    label: "GitHub",
    href: "https://github.com/remiCzn",
    icon: <Github />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/remicazin",
    icon: <Linkedin />,
  },
  {
    label: "Email",
    href: "mailto:cazinremi@gmail.com",
    icon: <Mail />,
  },
];

function useRevealOnScroll() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-animate]");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("animate-fade-up"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}

export default function HomePage() {
  useRevealOnScroll();

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <header className="top-0 z-20 backdrop-blur-md">
        <div className="navbar mx-auto max-w-6xl px-4 py-4">
          <div className="flex-1">
            <a href="#accueil" className="text-xl font-semibold tracking-tight">
              Rémi Cazin
            </a>
          </div>
          <nav className="hidden gap-4 md:flex">
            <a className="btn btn-ghost btn-sm" href="#projets">
              Projets
            </a>
            <a className="btn btn-ghost btn-sm" href="#cv">
              CV / Parcours
            </a>
            <a className="btn btn-ghost btn-sm" href="#contact">
              Contact
            </a>
          </nav>
          <div className="dropdown dropdown-end md:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-square"
            >
              <Menu />
            </div>
            <ul className="menu dropdown-content menu-sm z-10 mt-3 w-48 rounded-box bg-base-100 p-2 shadow">
              <li>
                <a href="#projets">Projets</a>
              </li>
              <li>
                <a href="#cv">CV / Parcours</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-12">
        <section id="accueil" className="hero min-h-[70vh] justify-start pt-8">
          <div className="hero-content flex-col gap-10 lg:flex-row">
            <div className="avatar placeholder">
              <div className="mask mask-squircle bg-gradient-to-tr from-primary to-secondary p-1">
                <img
                  src="https://avatars.githubusercontent.com/u/77072160"
                  className="h-44 w-44 items-center justify-center rounded-2xl"
                />
              </div>
            </div>
            <div className="max-w-xl space-y-6">
              <h1 className="text-4xl font-bold lg:text-5xl" data-animate>
                Hi! 👋 I'm Rémi
              </h1>
              <p className="text-lg opacity-80" data-animate>
                Ingénieur logiciel passionné par le développement, la conception
                et la mise en production d'applications web et cloud. Expérience
                sur des architectures complètes - du stockage de données à
                l'interface utilisateur - avec un intérêt particulier pour la
                performance, la scalabilité et l'automatisation.
              </p>
              <div className="flex flex-wrap gap-3" data-animate>
                <a href="#projets" className="btn btn-primary">
                  Voir mes projets
                </a>
                <a href="#cv" className="btn btn-outline">
                  Voir mon parcours
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="cv" className="space-y-10 pt-12">
          <div
            className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
            data-animate
          >
            <div>
              <h2 className="text-3xl font-semibold">Parcours</h2>
              <p className="opacity-70">
                Expériences, formations et compétences techniques consolidées au
                fil de mes projets.
              </p>
            </div>
          </div>
          <div className="grid gap-10 lg:grid-cols-[2fr,1fr]">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold" data-animate>
                Expériences professionnelles
              </h3>
              <div className="space-y-4">
                {experiences.map((experience) => (
                  <article
                    data-animate
                    key={experience.company}
                    className="card border-l-4 border-primary bg-base-100 shadow"
                  >
                    <div className="card-body space-y-2">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h4 className="text-lg font-semibold">
                            {experience.role}
                          </h4>
                          <p className="text-sm font-medium opacity-80">
                            {experience.company}
                          </p>
                        </div>
                        <span className="badge badge-outline">
                          {experience.period}
                        </span>
                      </div>
                      <p className="opacity-80">{experience.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {experience.stack.map((tech) => (
                          <span key={tech} className="badge badge-ghost">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold" data-animate>
                  Formations
                </h3>
                <div className="space-y-3">
                  {education.map((item) => (
                    <div
                      key={item.title}
                      className="card border-l-4 border-secondary bg-base-100 shadow-md"
                      data-animate
                    >
                      <div className="card-body space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{item.title}</h4>
                          <span className="badge badge-outline badge-sm">
                            {item.period}
                          </span>
                        </div>
                        <p className="text-sm font-medium opacity-80">
                          {item.school}
                        </p>
                        <p className="text-sm opacity-70">{item.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold" data-animate>
                  Compétences clés
                </h3>
                <div className="grid gap-4">
                  {skillGroups.map((group) => (
                    <div
                      key={group.name}
                      className="card border-l-4 border-accent bg-base-100 shadow-md"
                      data-animate
                    >
                      <div className="card-body space-y-3">
                        <h4 className="font-semibold">{group.name}</h4>
                        <div className="flex flex-wrap gap-2">
                          {group.skills.map((skill) => (
                            <span
                              key={skill}
                              className="badge badge-secondary badge-outline"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projets" className="space-y-8 pt-12">
          <div className="flex items-center justify-between" data-animate>
            <div>
              <h2 className="text-3xl font-semibold">
                Projets extra-professionnels
              </h2>
              <p className="mt-2 opacity-70">
                Une sélection de réalisations personnelles mettant en avant mes
                compétences techniques.
              </p>
            </div>
            <span className="badge badge-primary badge-lg hidden sm:inline-flex">
              {projects.length} projets
            </span>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <div
                data-animate
                key={project.name}
                className="card bg-base-100 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="card-body space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold">{project.name}</h3>
                    <div className="badge badge-outline">Produit</div>
                  </div>
                  <p className="opacity-80">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="badge badge-secondary badge-outline"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="card-actions justify-end gap-2">
                    <a
                      href={project.github}
                      className="btn btn-sm btn-outline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Code
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        className="btn btn-sm btn-primary"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Démo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="space-y-8 pt-24" data-animate>
          <div className="flex flex-col items-start gap-3">
            <h2 className="text-3xl font-semibold">Contact</h2>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <h3 className="text-xl font-semibold">Me contacter</h3>
              <div className="flex flex-wrap gap-4">
                {contacts.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    className="btn btn-outline gap-2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {contact.icon}
                    {contact.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
