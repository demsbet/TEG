import { useState, useEffect } from 'react';
import { 
  initialServices, 
  initialSectors, 
  initialProjects, 
  initialStatistics, 
  initialCompanyInfo, 
  initialTestimonials 
} from './data';
import { CompanyInfo, Service, Sector, Project, KeyStatistic } from './types';

// Component imports
import AdminModeBanner from './components/AdminModeBanner';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import SectorsSection from './components/SectorsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactDevisSection from './components/ContactDevisSection';

// Lucide icons for footer metadata
import { Award, ShieldAlert, Cpu, Heart, CheckCircle2, MapPin, Settings } from 'lucide-react';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('accueil');

  // Shared Core States, synchronized to simulate a fully interactive CRUD admin backend!
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => {
    const saved = localStorage.getItem('teg_company_info');
    return saved ? JSON.parse(saved) : initialCompanyInfo;
  });

  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('teg_services');
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [sectors, setSectors] = useState<Sector[]>(() => {
    const saved = localStorage.getItem('teg_sectors');
    return saved ? JSON.parse(saved) : initialSectors;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('teg_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [statistics, setStatistics] = useState<KeyStatistic[]>(() => {
    const saved = localStorage.getItem('teg_statistics');
    return saved ? JSON.parse(saved) : initialStatistics;
  });

  const [selectedServiceIdForQuote, setSelectedServiceIdForQuote] = useState<string | null>(null);

  // Persistence side-effects
  useEffect(() => {
    localStorage.setItem('teg_company_info', JSON.stringify(companyInfo));
  }, [companyInfo]);

  useEffect(() => {
    localStorage.setItem('teg_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('teg_sectors', JSON.stringify(sectors));
  }, [sectors]);

  useEffect(() => {
    localStorage.setItem('teg_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('teg_statistics', JSON.stringify(statistics));
  }, [statistics]);

  // Handle direct selection flow from Services tab into the interactive Quote builder!
  const handleSelectServiceForQuote = (srvId: string) => {
    setSelectedServiceIdForQuote(srvId);
    setActiveTab('contact');
    
    // Smooth scroll directly to the contact & devis builder
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* 1. AdminModeBanner representing a real-time editable workspace for showcase and SEO admins */}
      <AdminModeBanner 
        isAdmin={isAdmin} 
        setIsAdmin={setIsAdmin} 
        isModalOpen={isAdminModalOpen} 
        setIsModalOpen={setIsAdminModalOpen} 
      />

      {/* 2. Premium Sticky Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isAdmin={isAdmin} 
        setIsAdmin={setIsAdmin} 
      />

      {/* 3. Main content sections */}
      <main>
        
        {/* SECTION 1: HOME (Accueil) - Including slogan, CTAs and KPIs */}
        <div id="accueil">
          <Hero 
            companyInfo={companyInfo} 
            statistics={statistics} 
            isAdmin={isAdmin} 
            onUpdateCompany={setCompanyInfo}
            onUpdateStats={setStatistics}
            onNavigate={(tab) => {
              setActiveTab(tab);
              const el = document.getElementById(tab);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>

        {/* SECTION 2: ABOUT (À propos) - Including vision, values and Central Africa map */}
        <div id="about">
          <AboutSection 
            companyInfo={companyInfo} 
            isAdmin={isAdmin} 
            onUpdateCompany={setCompanyInfo} 
          />
        </div>

        {/* SECTION 3: SERVICES - Master/Detail interactive tab selection connected to the Quote Builder */}
        <div id="services">
          <ServicesSection 
            services={services} 
            isAdmin={isAdmin} 
            onUpdateServices={setServices} 
            onSelectServiceForQuote={handleSelectServiceForQuote}
          />
        </div>

        {/* SECTION 4: SECTORS OF ACTIVITY - Specialized equipment categories & specifications */}
        <div id="sectors">
          <SectorsSection 
            sectors={sectors} 
            isAdmin={isAdmin} 
            onUpdateSectors={setSectors} 
          />
        </div>

        {/* SECTION 5: REALISATIONS / PROJECTS - Catalog with filters and interactive Admin creation */}
        <div id="realisations">
          <ProjectsSection 
            projects={projects} 
            testimonials={initialTestimonials} 
            isAdmin={isAdmin} 
            onUpdateProjects={setProjects} 
          />
        </div>

        {/* SECTION 6: CONTACT & DEVIS BUILDER - Full form, budget calculator, print layout and direct links */}
        <div id="contact">
          <ContactDevisSection 
            companyInfo={companyInfo} 
            services={services} 
            selectedServiceId={selectedServiceIdForQuote} 
            isAdmin={isAdmin} 
            onUpdateCompany={setCompanyInfo} 
          />
        </div>

      </main>

      {/* 4. Elegant Professional Footer block */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Logo, short presentation column */}
          <div className="md:col-span-5 space-y-6 text-left">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white relative">
                <svg viewBox="0 0 100 100" className="h-6 w-6 text-white stroke-[2]">
                  <path d="M 30,50 C 30,30 70,30 70,50 C 70,70 30,70 30,50 Z" fill="none" stroke="currentColor" strokeWidth="12" />
                  <path d="M 50,15 L 50,85" stroke="currentColor" strokeWidth="10" />
                </svg>
              </div>

              <div className="text-left leading-none">
                <span className="font-display font-extrabold text-lg text-white block tracking-tight">TEG SARL</span>
                <span className="text-[9px] font-mono tracking-widest text-emerald-400 block uppercase font-bold">Tenfi Engineering Group</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-sm">
              {companyInfo.summary}
            </p>

            <div className="flex gap-4 text-xs font-mono font-bold text-slate-500">
              <span className="flex items-center gap-1">
                <CheckCircle2 size={13} className="text-emerald-500" />
                CE Certifié
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 size={13} className="text-emerald-500" />
                ISO 13485
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 size={13} className="text-emerald-500" />
                SAV 24/7
              </span>
            </div>
          </div>

          {/* Quick links Columns */}
          <div className="md:col-span-3 text-left space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-slate-400">
              Navigation Rapide
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#accueil" onClick={() => setActiveTab('accueil')} className="text-slate-400 hover:text-emerald-400 transition">
                  Page d'accueil
                </a>
              </li>
              <li>
                <a href="#about" onClick={() => setActiveTab('about')} className="text-slate-400 hover:text-emerald-400 transition">
                  Qui sommes-nous ?
                </a>
              </li>
              <li>
                <a href="#services" onClick={() => setActiveTab('services')} className="text-slate-400 hover:text-emerald-400 transition">
                  Prestations & Services
                </a>
              </li>
              <li>
                <a href="#sectors" onClick={() => setActiveTab('sectors')} className="text-slate-400 hover:text-emerald-400 transition">
                  Secteurs d'activité
                </a>
              </li>
              <li>
                <a href="#realisations" onClick={() => setActiveTab('realisations')} className="text-slate-400 hover:text-emerald-400 transition">
                  Nos Réalisations
                </a>
              </li>
            </ul>
          </div>

          {/* Zones coordinates Columns */}
          <div className="md:col-span-4 text-left space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-slate-400 font-mono">
              Infrastructures & SAV
            </h4>
            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  {companyInfo.address}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest block font-mono">Assistance Technique Douala</span>
                <span className="text-slate-300 block font-bold font-mono">
                  {companyInfo.phone}
                </span>
                {companyInfo.phone2 && (
                  <span className="text-slate-400 block font-bold font-mono text-xs opacity-75">
                    {companyInfo.phone2}
                  </span>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Outer credit line */}
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
          <div className="flex flex-col items-center sm:items-start gap-2.5">
            <span>
              © {new Date().getFullYear()} **TEG (Tenfi Engineering Group SARL)**. Tous droits réservés.
            </span>
            <button
              onClick={isAdmin ? () => { if (confirm("Voulez-vous désactiver le mode administrateur ?")) setIsAdmin(false); } : () => setIsAdminModalOpen(true)}
              title={isAdmin ? "Désactiver le Mode Administrateur" : "Accès Administration"}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-mono border transition-all duration-300 cursor-pointer ${
                isAdmin 
                  ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/80 hover:border-emerald-500/50' 
                  : 'bg-slate-950/50 border-slate-800 text-slate-600 hover:text-slate-400 hover:border-slate-700'
              }`}
            >
              <Settings size={12} className={isAdmin ? 'animate-spin [animation-duration:8s]' : 'transition-transform duration-500 hover:rotate-45'} />
              <span>{isAdmin ? "Admin Actif (Désactiver)" : "Espace Admin"}</span>
            </button>
          </div>
          <span className="text-[10px] bg-slate-950 border border-slate-850 px-2.5 py-1 rounded-md text-slate-400 font-mono self-center sm:self-end">
            Ingénierie Spécialisée & Maintenance Biomédicale en Afrique Centrale (Cameroun, Tchad, Djibouti)
          </span>
        </div>
      </footer>

    </div>
  );
}
