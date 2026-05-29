import { useState } from 'react';
import { Menu, X, ShieldAlert, Award, FileText, LayoutGrid } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

export default function Header({ activeTab, setActiveTab, isAdmin, setIsAdmin }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'services', label: 'Nos Services' },
    { id: 'sectors', label: 'Secteurs d\'activité' },
    { id: 'realisations', label: 'Nos Réalisations' },
    { id: 'contact', label: 'Contact & Devis' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    
    // Smooth scroll to element if present
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* TEG Premium Biomorphic SVG Logo */}
        <div 
          onClick={() => handleNavClick('accueil')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Customized biomorphic logo representing medical helix and engineering spirals */}
          <div className="h-11 w-11 rounded-xl bg-slate-900 flex items-center justify-center text-white relative shadow-md shadow-emerald-500/5 group-hover:scale-105 transition">
            <svg viewBox="0 0 100 100" className="h-7 w-7 text-emerald-400">
              <path 
                d="M 30,50 C 30,30 70,30 70,50 C 70,70 30,70 30,50 Z" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="10" 
                strokeLinecap="round"
                className="animate-pulse"
              />
              <path 
                d="M 50,20 L 50,80" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="8" 
                strokeLinecap="round"
              />
              <circle cx="50" cy="50" r="10" fill="currentColor" />
            </svg>
            
            {/* Ambient status dot */}
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white animate-pulse"></span>
          </div>

          <div className="text-left">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-display font-extrabold text-lg text-slate-900 tracking-tight">TEG</span>
              <span className="text-[9px] font-bold text-slate-400 border border-slate-200 px-1 rounded">SARL</span>
            </div>
            <span className="text-[9px] font-mono tracking-widest text-emerald-600 block uppercase font-bold">Tenfi Engineering Group</span>
          </div>
        </div>

        {/* Desktop navigation menu */}
        <nav className="hidden lg:flex items-center gap-1.5 font-sans">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all relative ${
                  isActive 
                    ? 'bg-emerald-50 text-emerald-800' 
                    : 'text-slate-650 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Dynamic call to action trigger or header info detail */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="text-right flex flex-col justify-center">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block font-sans">Assistance Régionale</span>
            <a href="tel:+237696248786" className="text-xs font-extrabold text-slate-900 font-mono hover:text-emerald-700 transition">
              +237 696 24 87 86
            </a>
          </div>

          <button
            onClick={() => handleNavClick('contact')}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-md transition hover:-translate-y-0.5"
          >
            Formulaire de Devis
          </button>
        </div>

        {/* Mobile menu trigger button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-50"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>

      {/* Mobile Drawer Menu content structure */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 animate-slide-down">
          <nav className="flex flex-col p-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition ${
                    isActive 
                      ? 'bg-emerald-50 text-emerald-800' 
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <div className="px-4 text-left">
                <span className="text-[9px] text-slate-400 font-bold uppercase block">SAV Direct</span>
                <a href="tel:+237696248786" className="text-xs font-bold text-slate-800 font-mono">
                  +237 696 24 87 86
                </a>
              </div>
              
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full bg-slate-900 text-white text-xs font-bold py-3 rounded-xl text-center"
              >
                Générer un Devis
              </button>
            </div>
          </nav>
        </div>
      )}

    </header>
  );
}
