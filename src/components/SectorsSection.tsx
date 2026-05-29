import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sector } from '../types';
import LucideIcon from './LucideIcon';
import { ShieldCheck, Plus, Trash2, Check, ArrowRight } from 'lucide-react';

interface SectorsSectionProps {
  sectors: Sector[];
  isAdmin: boolean;
  onUpdateSectors: (sectors: Sector[]) => void;
}

export default function SectorsSection({ sectors, isAdmin, onUpdateSectors }: SectorsSectionProps) {
  const [activeSectorId, setActiveSectorId] = useState<string>(sectors[0]?.id || 'imagerie');
  const [newEquipmentName, setNewEquipmentName] = useState('');

  const handleAddEquipment = (secId: string) => {
    if (!newEquipmentName.trim()) return;
    const updated = sectors.map(sec => {
      if (sec.id === secId) {
        return {
          ...sec,
          equipments: [...sec.equipments, newEquipmentName.trim()]
        };
      }
      return sec;
    });
    onUpdateSectors(updated);
    setNewEquipmentName('');
  };

  const handleRemoveEquipment = (secId: string, indexToRemove: number) => {
    const updated = sectors.map(sec => {
      if (sec.id === secId) {
        return {
          ...sec,
          equipments: sec.equipments.filter((_, idx) => idx !== indexToRemove)
        };
      }
      return sec;
    });
    onUpdateSectors(updated);
  };

  const activeSector = sectors.find(sec => sec.id === activeSectorId);

  return (
    <section id="sectors" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest font-mono bg-emerald-50 px-3 py-1 rounded-full">
            Secteurs d'Activité
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 leading-tight">
            Notre Domaine d'Expertise Technique
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-sans">
            Nous intervenons sur des dispositifs de haute technicité où la précision de l'étalonnage et le respect des protocoles garantissent la précision du diagnostic.
          </p>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {sectors.map((sec) => {
            const isActive = activeSectorId === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSectorId(sec.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-2 border text-left ${
                  isActive 
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-600/10' 
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <LucideIcon name={sec.iconName} size={15} />
                <span>{sec.name}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed deep-dive segment */}
        <AnimatePresence mode="wait">
          {activeSector ? (
            <motion.div 
              key={activeSector.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-12 gap-10 items-stretch"
            >
              
              {/* Technical features column */}
              <div className="lg:col-span-7 space-y-8 flex flex-col justify-between text-left">
                <div className="space-y-5">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <LucideIcon name={activeSector.iconName} size={22} className="stroke-[2.5]" />
                    <span className="font-mono text-xs uppercase tracking-widest font-bold">SPÉCIALITÉ BIOMÉDICALE</span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-950">
                    Ingénierie pour : {activeSector.name}
                  </h3>
                  
                  <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
                    {activeSector.description}
                  </p>

                  {/* Typical services in this sector list */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest block">Notre champ d'action sur cette filière :</span>
                    <ul className="space-y-3">
                      {activeSector.details.map((detail, idx) => (
                        <li key={idx} className="flex gap-3 text-slate-700 font-sans text-xs sm:text-sm">
                          <span className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom trust footer */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center gap-3.5 mt-8">
                  <div className="p-2 ml-1 rounded-xl bg-emerald-100/80 text-emerald-800">
                    <ShieldCheck size={18} />
                  </div>
                  <div className="text-slate-600 font-sans text-[11px] font-medium leading-normal">
                    Toutes nos interventions sur la spécialité **{activeSector.name}** sont certifiées étalonnées et conformes aux prérequis métrologiques du protocole constructeur.
                  </div>
                </div>

              </div>

              {/* Equipments list column */}
              <div className="lg:col-span-5">
                <div className="bg-slate-900 text-slate-100 p-6 sm:p-8 rounded-3xl h-full flex flex-col justify-between border border-slate-850 shadow-xl relative overflow-hidden">
                  
                  {/* Decorative background pulse */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

                  <div className="space-y-6 relative z-10 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[10px] font-mono tracking-widest block uppercase font-bold">Catalogue des Équipements</span>
                      <span className="text-emerald-400 text-[10px] font-mono bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded">MODÈLES SUPPORTÉS</span>
                    </div>

                    <p className="text-slate-400 text-xs font-light">
                      Voici la liste exhaustive des types d'équipements médicaux de pointe pour lesquels nos ingénieurs possèdent l'habilitation constructeur :
                    </p>

                    <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                      {activeSector.equipments.map((eq, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-850 hover:bg-slate-900/60 transition"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                            <span className="text-xs sm:text-sm font-medium text-slate-200">{eq}</span>
                          </div>

                          {isAdmin && (
                            <button
                              onClick={() => handleRemoveEquipment(activeSector.id, idx)}
                              className="text-red-500 hover:text-red-400 p-1 hover:bg-slate-800 rounded transition"
                              title="Retirer cet équipement"
                            >
                              <Trash2 size={12} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add Equipment form specifically shown for the admin */}
                  {isAdmin ? (
                    <div className="mt-6 pt-5 border-t border-slate-800 space-y-3 relative z-10 text-left bg-slate-950 p-4 rounded-xl">
                      <span className="text-[10px] text-emerald-400 font-mono tracking-widest block font-bold uppercase">➕ Publier un Nouvel Équipement</span>
                      
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Ex: Échographe Doppler Portable"
                          value={newEquipmentName}
                          onChange={(e) => setNewEquipmentName(e.target.value)}
                          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg text-xs p-2 text-white focus:outline-emerald-500"
                        />
                        <button
                          onClick={() => handleAddEquipment(activeSector.id)}
                          className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs"
                        >
                          Ajouter
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-8 pt-5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 relative z-10">
                      <span>Disponible sous SAV 24h</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        Consulter la fiche technique
                        <ArrowRight size={12} />
                      </span>
                    </div>
                  )}

                </div>
              </div>

            </motion.div>
          ) : (
            <p className="text-slate-400 text-sm">Veuillez sélectionner un secteur d'activité technique représentatif.</p>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
