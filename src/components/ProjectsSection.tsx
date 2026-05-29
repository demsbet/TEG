import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, Testimonial } from '../types';
import { MapPin, Plus, Trash2, Calendar, Tag, ShieldCheck, UserCheck } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  testimonials: Testimonial[];
  isAdmin: boolean;
  onUpdateProjects: (projects: Project[]) => void;
}

export default function ProjectsSection({ 
  projects, 
  testimonials, 
  isAdmin, 
  onUpdateProjects 
}: ProjectsSectionProps) {
  const [filterCountry, setFilterCountry] = useState<string>('Tous');
  
  // Adding New Project State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjCategory, setNewProjCategory] = useState('Imagerie Médicale');
  const [newProjClient, setNewProjClient] = useState('');
  const [newProjCountry, setNewProjCountry] = useState('Cameroun');
  const [newProjYear, setNewProjYear] = useState('2026');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjStatus, setNewProjStatus] = useState<'Complété' | 'En cours'>('Complété');

  const handleAddProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitle || !newProjClient || !newProjDesc) {
      alert('Veuillez remplir les champs obligatoires.');
      return;
    }

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: newProjTitle,
      category: newProjCategory,
      client: newProjClient,
      country: newProjCountry,
      year: newProjYear,
      description: newProjDesc,
      status: newProjStatus,
      imagePlaceholderColor: 'from-emerald-900 via-teal-900 to-slate-900'
    };

    onUpdateProjects([...projects, newProject]);

    // reset forms
    setNewProjTitle('');
    setNewProjClient('');
    setNewProjDesc('');
    setShowAddForm(false);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réalisation ?')) {
      onUpdateProjects(projects.filter(p => p.id !== id));
    }
  };

  const filteredProjects = filterCountry === 'Tous'
    ? projects
    : projects.filter(p => p.country.toLowerCase() === filterCountry.toLowerCase());

  return (
    <section id="realisations" className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div className="max-w-xl text-left space-y-4">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest font-mono bg-emerald-100/50 px-3 py-1 rounded-full">
              Nos Réalisations
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 leading-tight">
              L'Expertise TEG Prouvée sur le Terrain
            </h2>
            <p className="text-sm text-slate-500 font-sans">
              Découvrez nos dernières installations de pointe et contrats de maintenance réussis à travers l'Afrique Centrale.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {isAdmin && (
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition"
              >
                {showAddForm ? 'Fermer le formulaire' : '➕ Publier un Projet'}
              </button>
            )}
            
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-slate-200">
              {['Tous', 'Cameroun', 'Tchad', 'Djibouti'].map((country) => (
                <button
                  key={country}
                  onClick={() => setFilterCountry(country)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-md transition ${
                    filterCountry === country
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- FORMULAIRE D'AJOUT DE PROJET --- */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white border-2 border-dashed border-emerald-400 p-6 rounded-3xl mb-12 overflow-hidden text-left"
            >
              <h3 className="text-sm font-bold text-emerald-700 mb-4 flex items-center gap-1">
                <span>📝 Formulaire Administrateur - Publier une Nouvelle Réalisation</span>
              </h3>
              
              <form onSubmit={handleAddProjectSubmit} className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-500">Titre de la Réalisation *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Installation d'un Appareil IRM"
                    value={newProjTitle}
                    onChange={(e) => setNewProjTitle(e.target.value)}
                    className="w-full border border-slate-250 rounded px-2.5 py-2"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-500">Catégorie d'équipement</label>
                  <input
                    type="text"
                    placeholder="Ex: Imagerie Médicale, Bloc"
                    value={newProjCategory}
                    onChange={(e) => setNewProjCategory(e.target.value)}
                    className="w-full border border-slate-250 rounded px-2.5 py-2"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-500">Nom de l'Établissement / Clinique *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Hôpital Central Peltier"
                    value={newProjClient}
                    onChange={(e) => setNewProjClient(e.target.value)}
                    className="w-full border border-slate-250 rounded px-2.5 py-2"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-500">Pays *</label>
                  <select
                    value={newProjCountry}
                    onChange={(e) => setNewProjCountry(e.target.value)}
                    className="w-full border border-slate-250 bg-white rounded px-2.5 py-2"
                  >
                    <option value="Cameroun">Cameroun</option>
                    <option value="Tchad">Tchad</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Centrafrique">Centrafrique</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-500">Année de mise en œuvre *</label>
                  <input
                    type="number"
                    required
                    value={newProjYear}
                    onChange={(e) => setNewProjYear(e.target.value)}
                    className="w-full border border-slate-250 rounded px-2.5 py-2"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-500">Statut du Projet</label>
                  <select
                    value={newProjStatus}
                    onChange={(e) => setNewProjStatus(e.target.value as any)}
                    className="w-full border border-slate-250 bg-white rounded px-2.5 py-2"
                  >
                    <option value="Complété">Complété</option>
                    <option value="En cours">En cours</option>
                  </select>
                </div>

                <div className="sm:col-span-2 md:col-span-3 space-y-1">
                  <label className="font-bold text-slate-500">Description des Travaux & Défis techniques relevés *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Expliquez la mission : transport, blindage, calibrations, mise en service..."
                    value={newProjDesc}
                    onChange={(e) => setNewProjDesc(e.target.value)}
                    className="w-full border border-slate-250 rounded px-2.5 py-2"
                  />
                </div>

                <div className="sm:col-span-2 md:col-span-3 pt-2">
                  <button
                    type="submit"
                    className="bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 rounded-lg hover:bg-emerald-700"
                  >
                    Publier la Réalisation
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- GRID OF PROJECTS --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-xs hover:shadow-xl transition flex flex-col justify-between group"
              >
                
                {/* Simulated Modern Abstract Device Image */}
                <div className={`p-6 mt-4 mx-4 rounded-2xl bg-gradient-to-br ${p.imagePlaceholderColor} text-white flex flex-col justify-between aspect-video relative`}>
                  {/* Glassmorph Header */}
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                      {p.category}
                    </span>
                    <span className={`text-[9px] px-2 py-0.5 rounded-md font-bold uppercase tracking-widest ${
                      p.status === 'Complété' ? 'bg-emerald-500/30 text-emerald-200' : 'bg-yellow-500/30 text-yellow-200 animate-pulse'
                    }`}>
                      {p.status}
                    </span>
                  </div>

                  {/* Device Graphic Mock */}
                  <div className="self-center">
                    <svg className="h-10 w-32 text-emerald-300 opacity-60" fill="none" viewBox="0 0 100 30" stroke="currentColor">
                      <path d="M 0 15 Q 25 30, 50 15 T 100 15" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="50" cy="15" r="4" fill="currentColor" className="animate-pulse" />
                    </svg>
                  </div>

                  {/* Ground metadata */}
                  <div className="flex justify-between items-center text-[10px] text-emerald-50 font-mono tracking-tight pt-2 border-t border-white/10">
                    <span className="font-semibold">{p.client}</span>
                    <span className="opacity-90">{p.year}</span>
                  </div>
                </div>

                {/* Info and content details */}
                <div className="p-6 space-y-4 text-left flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-display font-extrabold text-slate-900 text-base sm:text-lg group-hover:text-emerald-700 transition leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-sans leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold font-sans">
                      <MapPin size={13} className="text-emerald-600 shrink-0" />
                      <span>{p.country}</span>
                    </div>

                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteProject(p.id)}
                        className="text-red-500 hover:text-red-700 p-1 bg-red-50 hover:bg-red-100 rounded text-xs inline-flex items-center gap-1"
                        title="Supprimer la réalisation"
                      >
                        <Trash2 size={12} />
                        <span>Retirer</span>
                      </button>
                    )}
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- TESTIMONIALS SLIDER / HIGHLIGHT --- */}
        <div className="mt-20 pt-16 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-widest font-mono">Témoignages Clients</span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-950">
              Ce que les décideurs biomédicaux disent de nous
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div 
                key={t.id}
                className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-xs flex flex-col justify-between space-y-4 text-left relative"
              >
                {/* Quotes bubble icon representation */}
                <span className="absolute -top-3 left-6 text-5xl font-serif text-emerald-100 leading-none">“</span>
                
                <p className="text-xs sm:text-sm text-slate-600 font-sans italic leading-relaxed relative z-10 pt-2 flex-1">
                  {t.text}
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 flex items-center gap-1">
                      <UserCheck size={12} className="text-emerald-600" />
                      {t.author}
                    </h4>
                    <p className="text-[10px] font-semibold text-slate-400">
                      {t.role}, <span className="text-slate-500">{t.institution}</span>
                    </p>
                  </div>
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold text-[10px] uppercase font-mono tracking-tight">
                    {t.country}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
