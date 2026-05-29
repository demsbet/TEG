import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Service } from '../types';
import LucideIcon from './LucideIcon';
import { Check, ArrowRight, Sparkles, Plus, Trash2, Edit } from 'lucide-react';

interface ServicesSectionProps {
  services: Service[];
  isAdmin: boolean;
  onUpdateServices: (services: Service[]) => void;
  onSelectServiceForQuote: (srvId: string) => void;
}

export default function ServicesSection({ 
  services, 
  isAdmin, 
  onUpdateServices, 
  onSelectServiceForQuote 
}: ServicesSectionProps) {
  const [activeServiceId, setActiveServiceId] = useState<string>(services[0]?.id || 'conseil');
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  // Form states for adding or editing
  const [editName, setEditName] = useState('');
  const [editShort, setEditShort] = useState('');
  const [editFull, setEditFull] = useState('');
  const [editAdvantages, setEditAdvantages] = useState<string[]>([]);
  const [editIcon, setEditIcon] = useState('FileText');

  const startEditService = (srv: Service) => {
    setEditingServiceId(srv.id);
    setEditName(srv.name);
    setEditShort(srv.shortDescription);
    setEditFull(srv.fullDescription);
    setEditAdvantages([...srv.advantages]);
    setEditIcon(srv.icon);
  };

  const handleSaveServiceEdit = (id: string) => {
    const updated = services.map(srv => {
      if (srv.id === id) {
        return {
          ...srv,
          name: editName,
          shortDescription: editShort,
          fullDescription: editFull,
          advantages: editAdvantages,
          icon: editIcon
        };
      }
      return srv;
    });
    onUpdateServices(updated);
    setEditingServiceId(null);
  };

  const handleDeleteService = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      const filtered = services.filter(srv => srv.id !== id);
      onUpdateServices(filtered);
      if (activeServiceId === id && filtered.length > 0) {
        setActiveServiceId(filtered[0].id);
      }
    }
  };

  const handleAddService = () => {
    const newService: Service = {
      id: `service-${Date.now()}`,
      name: 'Nouveau Service Biomédical',
      shortDescription: 'Description courte du nouveau service offert par TEG.',
      fullDescription: 'Description approfondie des protocoles, technologies et de l\'assistance d\'ingénierie fournie.',
      advantages: [
        'Avantage clé 1 de ce service personnalisé.',
        'Avantage clé 2 de ce service personnalisé.'
      ],
      equipmentList: [
        'Équipement associé 1',
        'Équipement associé 2'
      ],
      icon: 'Activity'
    };
    onUpdateServices([...services, newService]);
    setActiveServiceId(newService.id);
  };

  const activeService = services.find(srv => srv.id === activeServiceId);

  return (
    <section id="services" className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header content */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest font-mono bg-emerald-100/50 px-3 py-1 rounded-full">
              Nos Services Spécifiques
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 leading-tight">
              Des Prestations Biomédicales Couronnées de Rigueur
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-sans">
              De l\'étude technique à la maintenance réactive d\'urgence, nous sécurisons la continuité d\'exploitation de votre établissement hospitalier.
            </p>
          </div>
          
          {isAdmin && (
            <button
              onClick={handleAddService}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition"
            >
              <Plus size={14} />
              Ajouter un Service
            </button>
          )}
        </div>

        {/* Master Details Component structure */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT LIST: Navigation Cards */}
          <div className="lg:col-span-5 space-y-3.5">
            {services.map((srv) => {
              const isSelected = activeServiceId === srv.id;
              return (
                <div 
                  key={srv.id}
                  onClick={() => setActiveServiceId(srv.id)}
                  className={`p-5 rounded-2xl cursor-pointer transition text-left relative group ${
                    isSelected 
                      ? 'bg-slate-900 text-white shadow-xl translate-x-2' 
                      : 'bg-white text-slate-800 border border-slate-200/60 hover:border-slate-350 hover:bg-slate-100/40'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon frame */}
                    <div className={`p-3 rounded-xl transition ${
                      isSelected ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      <LucideIcon name={srv.icon} size={20} />
                    </div>
                    
                    <div className="space-y-1.5 flex-1 pr-12">
                      <h3 className="font-display font-extrabold text-sm sm:text-base tracking-tight">
                        {srv.name}
                      </h3>
                      <p className={`text-xs ${isSelected ? 'text-slate-400' : 'text-slate-500'} line-clamp-2`}>
                        {srv.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Forward arrow */}
                  <div className="absolute top-1/2 -translate-y-1/2 right-4 opacity-0 group-hover:opacity-100 transition">
                    <ArrowRight size={16} className={isSelected ? 'text-emerald-400' : 'text-slate-400'} />
                  </div>

                  {/* Admin controls */}
                  {isAdmin && (
                    <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-60 hover:opacity-100">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditService(srv);
                        }}
                        className="p-1.5 rounded-md bg-white text-slate-700 hover:bg-emerald-100 hover:text-emerald-700 shadow-sm border border-slate-200"
                        title="Éditer le service"
                      >
                        <Edit size={11} />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteService(srv.id);
                        }}
                        className="p-1.5 rounded-md bg-white text-red-600 hover:bg-red-100 shadow-sm border border-slate-200"
                        title="Supprimer le service"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT VIEW: Fully Detailed Page Section */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs relative">
            <div className="absolute top-6 right-6 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[9px] font-mono tracking-wider font-bold text-slate-400">DETAIL TECHNIQUE</span>
            </div>

            <AnimatePresence mode="wait">
              {editingServiceId === activeServiceId ? (
                <motion.div 
                  key="edit-form"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-4"
                >
                  <span className="text-xs font-bold text-emerald-600 block">📝 Mode Édition de Service</span>
                  
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Nom du service</label>
                      <input 
                        type="text" 
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-emerald-500 font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Nom de l'icône Lucide (ex: Wrench, Layers)</label>
                      <input 
                        type="text" 
                        value={editIcon}
                        onChange={(e) => setEditIcon(e.target.value)}
                        className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-emerald-500 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Slogan court (Short Description)</label>
                    <input 
                      type="text" 
                      value={editShort}
                      onChange={(e) => setEditShort(e.target.value)}
                      className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Description institutionnelle approfondie</label>
                    <textarea 
                      value={editFull}
                      onChange={(e) => setEditFull(e.target.value)}
                      rows={4}
                      className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-emerald-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase block">Avantages opérationnels (Max 3)</label>
                    {editAdvantages.map((adv, idx) => (
                      <input 
                        key={idx}
                        type="text"
                        value={adv}
                        onChange={(e) => {
                          const updated = [...editAdvantages];
                          updated[idx] = e.target.value;
                          setEditAdvantages(updated);
                        }}
                        className="w-full text-xs border border-slate-200 rounded p-1.5 bg-slate-50 focus:outline-emerald-500"
                        placeholder={`Avantage #${idx + 1}`}
                      />
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleSaveServiceEdit(activeServiceId)}
                      className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-emerald-700"
                    >
                      Enregistrer
                    </button>
                    <button
                      onClick={() => setEditingServiceId(null)}
                      className="bg-slate-100 text-slate-750 text-xs font-bold px-4 py-2 rounded-lg hover:bg-slate-200"
                    >
                      Annuler
                    </button>
                  </div>
                </motion.div>
              ) : activeService ? (
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 text-left"
                >
                  {/* Icon & Title info */}
                  <div className="space-y-3">
                    <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <LucideIcon name={activeService.icon} size={24} />
                    </div>
                    <h3 className="text-2xl font-display font-extrabold text-slate-900 leading-tight">
                      {activeService.name}
                    </h3>
                    <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
                      {activeService.fullDescription}
                    </p>
                  </div>

                  {/* Advantages / Checkmarks */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-slate-400 font-mono">
                      Pourquoi choisir TEG pour ce service ?
                    </h4>
                    
                    <ul className="space-y-2.5">
                      {activeService.advantages.map((adv, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="p-0.5 rounded-full bg-emerald-100 text-emerald-700 mt-1 shrink-0">
                            <Check size={12} className="stroke-[3]" />
                          </div>
                          <span className="text-slate-700 font-sans text-xs sm:text-sm">
                            {adv}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Associated deliverables/equipments */}
                  {activeService.equipmentList && activeService.equipmentList.length > 0 && (
                    <div className="pt-4 border-t border-slate-100 space-y-2.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-widest block">Exemples d'équipements / documents associés :</span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeService.equipmentList.map((eq, innerIdx) => (
                          <span key={innerIdx} className="bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-md text-[11px] font-sans border border-slate-200/50">
                            {eq}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quote action linkage */}
                  <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-emerald-500 animate-pulse" />
                      <span className="text-[11px] text-slate-500 font-semibold font-sans">Quotation instantanée en 3 clics</span>
                    </div>

                    <button
                      onClick={() => onSelectServiceForQuote(activeService.id)}
                      className="bg-emerald-600 text-white font-bold text-xs px-5 py-3 rounded-xl hover:bg-emerald-700 transition flex items-center justify-center gap-1.5 group hover:-translate-y-0.5 shadow-sm shadow-emerald-600/10"
                    >
                      Inclure dans ma simulation de devis
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>

                </motion.div>
              ) : (
                <p className="text-slate-400 text-sm">Veuillez sélectionner un service pour afficher ses détails opérationnels.</p>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
