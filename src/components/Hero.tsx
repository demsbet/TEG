import { useState } from 'react';
import { motion } from 'motion/react';
import { KeyStatistic, CompanyInfo } from '../types';
import LucideIcon from './LucideIcon';
import { ArrowRight, MessageSquare, ShieldCheck, Zap, Activity } from 'lucide-react';

interface HeroProps {
  companyInfo: CompanyInfo;
  statistics: KeyStatistic[];
  isAdmin: boolean;
  onUpdateCompany: (info: CompanyInfo) => void;
  onUpdateStats: (stats: KeyStatistic[]) => void;
  onNavigate: (tab: string) => void;
}

export default function Hero({ 
  companyInfo, 
  statistics, 
  isAdmin, 
  onUpdateCompany, 
  onUpdateStats,
  onNavigate 
}: HeroProps) {
  const [isEditingText, setIsEditingText] = useState(false);
  const [slogan, setSlogan] = useState(companyInfo.slogan);
  const [summary, setSummary] = useState(companyInfo.summary);

  const handleSaveCompanyText = () => {
    onUpdateCompany({
      ...companyInfo,
      slogan,
      summary
    });
    setIsEditingText(false);
  };

  const handleStatEdit = (id: string, field: 'value' | 'label', newVal: string) => {
    const updated = statistics.map(st => {
      if (st.id === id) {
        return { ...st, [field]: newVal };
      }
      return st;
    });
    onUpdateStats(updated);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50/20 to-slate-100 py-16 lg:py-24 border-b border-slate-100">
      {/* Visual Ambient Circles */}
      <div className="absolute top-1/4 -left-36 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-12 w-[500px] h-[500px] bg-slate-200/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100/60 text-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wider border border-emerald-200/40"
            >
              <ShieldCheck size={12} className="stroke-[2.5]" />
              Expertise Biomédicale Certifiée
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-4"
            >
              {isAdmin ? (
                <div className="bg-white p-4 rounded-xl border-2 border-dashed border-emerald-400 space-y-3 shadow-sm">
                  <span className="text-xs font-bold text-emerald-600 block">📝 Édition Slogan & Présentation Rapide</span>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400">Slogan de l'entreprise</label>
                    <input 
                      type="text" 
                      value={slogan} 
                      onChange={(e) => setSlogan(e.target.value)} 
                      className="w-full text-lg font-bold border border-slate-200 rounded px-2 py-1 text-slate-900 bg-slate-50 mt-1 focus:outline-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400">Présentation rapide</label>
                    <textarea 
                      value={summary} 
                      rows={3}
                      onChange={(e) => setSummary(e.target.value)} 
                      className="w-full text-sm border border-slate-200 rounded px-2 py-1 text-slate-600 bg-slate-50 mt-1 focus:outline-emerald-500"
                    />
                  </div>
                  <button 
                    onClick={handleSaveCompanyText}
                    className="bg-emerald-600 text-white font-medium text-xs px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition"
                  >
                    Sauvegarder les Textes
                  </button>
                </div>
              ) : (
                <>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 leading-tight">
                    {companyInfo.slogan}
                  </h1>
                  <p className="text-base sm:text-lg text-slate-600 font-sans max-w-xl leading-relaxed">
                    {companyInfo.summary}
                  </p>
                </>
              )}
            </motion.div>

            {/* Quick action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 bg-emerald-600 text-white font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/20 group hover:-translate-y-0.5"
              >
                Demander un devis
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 bg-white text-slate-800 border border-slate-200 font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-slate-50 transition hover:border-slate-300 hover:-translate-y-0.5"
              >
                <MessageSquare size={16} className="text-emerald-600" />
                Nous contacter
              </button>
            </motion.div>

            {/* Key trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4"
            >
              <div className="flex items-center gap-2">
                <div className="p-1 px-1.5 rounded bg-emerald-100 text-emerald-800">
                  <Activity size={14} />
                </div>
                <span className="text-[11px] font-sans font-semibold text-slate-500">SAV d'urgence 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1 px-1.5 rounded bg-emerald-100 text-emerald-800">
                  <Zap size={14} />
                </div>
                <span className="text-[11px] font-sans font-semibold text-slate-500">Installation Clé en Main</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1 px-1.5 rounded bg-emerald-100 text-emerald-800">
                  <ShieldCheck size={14} />
                </div>
                <span className="text-[11px] font-sans font-semibold text-slate-500">Pièces Garantes d'Origine</span>
              </div>
            </motion.div>

          </div>

          {/* Technological mockup / diagnostic machine styling */}
          <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-md bg-slate-900 text-slate-200 p-5 rounded-3xl shadow-2xl border border-slate-800 relative z-20 group"
            >
              {/* Screen outer highlights */}
              <div className="absolute top-4 right-4 flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>

              {/* Title representation */}
              <div className="mb-4">
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 block font-bold">SYSTEME D'IMAGERIE TEG-64</span>
                <span className="text-[9px] text-slate-500 font-mono">STATUS : SURVEILLANCE ACTIVE</span>
              </div>

              {/* Central vector visualization - simulating scanning or real-time ECG telemetry */}
              <div className="bg-slate-950 p-4 rounded-2xl h-52 flex flex-col justify-between relative overflow-hidden border border-slate-850">
                {/* Background scanning grids */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-transparent to-transparent opacity-50"></div>
                <div className="absolute inset-0 opacity-10 space-y-4 py-2">
                  <div className="border-t border-slate-300 w-full"></div>
                  <div className="border-t border-slate-300 w-full"></div>
                  <div className="border-t border-slate-300 w-full"></div>
                  <div className="border-t border-slate-300 w-full"></div>
                </div>

                <div className="flex justify-between items-start relative z-10 w-full">
                  <div>
                    <span className="text-slate-400 font-mono text-[10px]">CHAMBRE D'ACQUISITION</span>
                    <h3 className="text-xl font-bold font-display text-emerald-400">1.5T Superconducteur</h3>
                  </div>
                  <div className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[9px] font-mono px-2 py-0.5 rounded uppercase font-semibold">
                    Calibré
                  </div>
                </div>

                {/* Simulated Waveform Animation */}
                <div className="w-full h-16 relative flex items-center justify-center my-3">
                  <svg className="w-full h-full text-emerald-500" fill="none" viewBox="0 0 400 100">
                    <path
                      d="M 0 50 L 50 50 L 70 50 L 80 10 L 90 90 L 100 50 L 130 50 L 140 30 L 150 70 L 160 50 L 210 50 L 225 50 L 235 5 L 245 95 L 255 50 L 290 50 L 300 50 L 310 40 L 320 60 L 330 50 L 400 50"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {/* Neon laser scan line bar */}
                  <div className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-emerald-400 to-transparent left-0 animate-infinite" style={{
                    animationName: 'slide-right',
                    animationDuration: '3.5s',
                    animationTimingFunction: 'linear',
                  }}></div>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 relative z-10">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span>HELIUM FREON: OK</span>
                  </div>
                  <span>96 Hz / SEC</span>
                </div>
              </div>

              {/* Auxiliary technical widgets */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-850 text-slate-400 text-[11px] space-y-0.5">
                  <span className="text-[9px] text-slate-600 block uppercase font-bold font-mono">Conseil médical</span>
                  <div className="flex justify-between font-mono font-bold text-slate-300">
                    <span>99% Conformité</span>
                  </div>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-850 text-slate-400 text-[11px] space-y-0.5">
                  <span className="text-[9px] text-slate-600 block uppercase font-bold font-mono">Assistance Technique</span>
                  <div className="flex justify-between font-mono font-bold text-emerald-400">
                    <span>Intervention -24H</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* --- CHIFFRES CLES --- */}
        <div className="mt-16 pt-10 border-t border-slate-200/80">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-display font-extrabold text-slate-900">Nos Chiffres Clés</h3>
              <p className="text-xs text-slate-500">L'impact concret de Tenfi Engineering Group dans la région.</p>
            </div>
            {isAdmin && (
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded border border-emerald-200 mt-2 md:mt-0">
                ✏️ Conseil : Double-cliquez pour éditer les valeurs en direct!
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {statistics.map((stat) => (
              <div 
                key={stat.id}
                className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs hover:shadow-md transition-all group flex items-start gap-4"
              >
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <LucideIcon name={stat.iconName} size={22} />
                </div>
                <div className="space-y-1 flex-1">
                  {isAdmin ? (
                    <div className="space-y-1.5 focus-within:ring-2 focus-within:ring-emerald-500 p-1 rounded">
                      <input 
                        type="text" 
                        value={stat.value} 
                        onChange={(e) => handleStatEdit(stat.id, 'value', e.target.value)} 
                        className="font-display font-extrabold text-2xl text-slate-900 w-full focus:outline-none bg-transparent"
                      />
                      <input 
                        type="text" 
                        value={stat.label} 
                        onChange={(e) => handleStatEdit(stat.id, 'label', e.target.value)} 
                        className="text-xs text-slate-500 w-full focus:outline-none bg-transparent"
                      />
                    </div>
                  ) : (
                    <>
                      <span className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 block tracking-tight">
                        {stat.value}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-600 font-medium block">
                        {stat.label}
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
