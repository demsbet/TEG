import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CompanyInfo } from '../types';
import { Shield, Eye, Award, Globe, Users, Heart, CheckCircle2, MapPin, Building, Phone } from 'lucide-react';

interface AboutSectionProps {
  companyInfo: CompanyInfo;
  isAdmin: boolean;
  onUpdateCompany: (info: CompanyInfo) => void;
}

interface CountryNodeDetails {
  name: string;
  role: string;
  engineers: string;
  address: string;
  contact: string;
}

const countryData: Record<string, CountryNodeDetails> = {
  cameroun: {
    name: 'Cameroun (Siège Social)',
    role: 'Bureau Principal, Stock Centralisé & Laboratoire d\'Étalonnage Principal',
    engineers: '8 Ingénieurs Biomédicaux résidents permanents',
    address: 'Douala, Avenue de la République - B.P 4023',
    contact: '+237 696 24 87 86 / 675 98 89 72'
  },
  tchad: {
    name: 'Tchad',
    role: 'Antenne d\'Assistance Technique & Distribution de Consommables',
    engineers: '4 Techniciens biomédicaux d\'astreinte',
    address: 'N\'Djamena, Quartier Bololo',
    contact: '+237 696 24 87 86 (Liaison Internationale)'
  },
  djibouti: {
    name: 'Djibouti',
    role: 'Bureau Expert Ophtalmologie & Contrats de Maintenance Région Est',
    engineers: '3 Ingénieurs spécialisés en systèmes d\'optique',
    address: 'Djibouti Ville, Rue de la Paix',
    contact: 'isaacfoula1991@gmail.com'
  }
};

export default function AboutSection({ companyInfo, isAdmin, onUpdateCompany }: AboutSectionProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>('cameroun');
  const [vision, setVision] = useState(companyInfo.vision);
  const [mission, setMission] = useState(companyInfo.mission);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveAbout = () => {
    onUpdateCompany({
      ...companyInfo,
      vision,
      mission
    });
    setIsEditing(false);
  };

  const currentCountry = countryData[selectedCountry];

  return (
    <section id="about" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest font-mono bg-emerald-50 px-3 py-1 rounded-full">
            Qui Sommes-Nous ?
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 leading-tight">
            Tenfi Engineering Group (TEG)
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-sans">
            Une entreprise d'ingénierie biomédicale passionnée par l'élévation technologique du plateau technique africain.
          </p>
        </div>

        {/* Qui sommes-nous, Vision & Mission details */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          
          {/* Institutional Presentation & Values */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-extrabold text-slate-900 flex items-center gap-3">
                <Building className="text-emerald-600 h-6 w-6" />
                Notre Origine et Engagement
              </h3>
              <p className="text-slate-600 leading-relaxed font-sans text-sm sm:text-base">
                Spécialisée dans l'ingénierie hospitalière, la vente, l'installation et la maintenance rigoureuse de matériel médical, **TEG SARL** s'affirme comme le partenaire privilégié des décideurs sanitaires d'Afrique Centrale.
              </p>
              <p className="text-slate-600 leading-relaxed font-sans text-sm">
                Trop d'équipements médicaux high-tech restent inutilisables en Afrique par manque de spécialistes certifiés pour la maintenance préventive et le SAV. **TEG** a été fondée spécifiquement pour casser ce cycle et garantir une pérennité absolue des technologies de traitement et d'imagerie diagnostique.
              </p>
            </div>

            {/* Core Values grid */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
                <div className="h-9 w-9 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center">
                  <Shield size={18} className="stroke-[2.5]" />
                </div>
                <h4 className="font-bold text-slate-950 text-sm">Rigueur Métrologique</h4>
                <p className="text-xs text-slate-500">Un équipement médical n'offre aucune ambiguïté. Nous calibrons selon les normes ISO constructeurs.</p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
                <div className="h-9 w-9 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center">
                  <Award size={18} className="stroke-[2.5]" />
                </div>
                <h4 className="font-bold text-slate-950 text-sm">Ingénieurs Certifiés</h4>
                <p className="text-xs text-slate-500">Notre équipe technique suit régulièrement des formations agréées chez les plus grands manufacturiers.</p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
                <div className="h-9 w-9 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center">
                  <Users size={18} className="stroke-[2.5]" />
                </div>
                <h4 className="font-bold text-slate-950 text-sm">Réactivité SAV</h4>
                <p className="text-xs text-slate-500">Nous comprenons que chaque heure d'arrêt d'une machine clinique peut mettre des vies en danger.</p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
                <div className="h-9 w-9 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center">
                  <Heart size={18} className="stroke-[2.5]" />
                </div>
                <h4 className="font-bold text-slate-950 text-sm">Éthique Biomédicale</h4>
                <p className="text-xs text-slate-500">Sélectionner exclusivement des équipements fiables à faible émission ou faible risque pour les patients.</p>
              </div>
            </div>
          </div>

          {/* Vision & Mission editor */}
          <div className="bg-slate-900 text-slate-100 p-8 rounded-3xl shadow-xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"></div>
            
            {isAdmin ? (
              <div className="space-y-4 bg-slate-950/40 p-4 rounded-2xl border border-slate-700">
                <span className="text-xs font-bold text-emerald-400 block mb-2">✍️ Édition de la Vision & Mission Historique</span>
                
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono font-bold uppercase">Vision Stratégique</label>
                  <textarea
                    value={vision}
                    onChange={(e) => setVision(e.target.value)}
                    rows={3}
                    className="w-full text-xs bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono font-bold uppercase">Mission Opérationnelle</label>
                  <textarea
                    value={mission}
                    onChange={(e) => setMission(e.target.value)}
                    rows={3}
                    className="w-full text-xs bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-emerald-500"
                  />
                </div>

                <button
                  onClick={handleSaveAbout}
                  className="bg-emerald-500 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-lg hover:bg-emerald-400 transition"
                >
                  Sauvegarder les sections
                </button>
              </div>
            ) : (
              <>
                {/* Vision Box */}
                <div className="space-y-3 relative z-10">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Eye size={20} className="stroke-[2]" />
                    <span className="font-mono text-xs uppercase tracking-widest font-bold">Notre Vision</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-display font-bold">Une excellence biomédicale pérenne</h4>
                  <p className="text-slate-400 font-light text-xs sm:text-sm leading-relaxed">
                    {companyInfo.vision}
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-800"></div>

                {/* Mission Box */}
                <div className="space-y-3 relative z-10">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 size={20} className="stroke-[2]" />
                    <span className="font-mono text-xs uppercase tracking-widest font-bold">Notre Mission</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-display font-bold">Protéger la continuité des soins biomédicaux</h4>
                  <p className="text-slate-400 font-light text-xs sm:text-sm leading-relaxed">
                    {companyInfo.mission}
                  </p>
                </div>
              </>
            )}
          </div>

        </div>

        {/* --- INTERACTIVE ZONE D'INTERVENTION --- */}
        <div className="bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200/80">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider font-mono">Territoire Opérationnel</span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-950">
                Notre Présence en Afrique Centrale
              </h3>
              <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed">
                TEG intervient quotidiennement de manière préventive ou curative sur tout l'axe de développement subsaharien, avec une attention particulière pour le Cameroun, le Tchad, et la République de Djibouti.
              </p>

              {/* Interactive buttons */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Cliquez pour voir nos implantations :</span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => setSelectedCountry('cameroun')}
                    className={`px-4 py-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition ${
                      selectedCountry === 'cameroun'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-white text-slate-700 border border-slate-250 hover:bg-slate-100'
                    }`}
                  >
                    <span>Cameroun (Siège)</span>
                    <MapPin size={12} className={selectedCountry === 'cameroun' ? 'text-white' : 'text-slate-400'} />
                  </button>
                  <button
                    onClick={() => setSelectedCountry('tchad')}
                    className={`px-4 py-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition ${
                      selectedCountry === 'tchad'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-white text-slate-700 border border-slate-250 hover:bg-slate-100'
                    }`}
                  >
                    <span>Tchad (Réactivité SAV)</span>
                    <MapPin size={12} className={selectedCountry === 'tchad' ? 'text-white' : 'text-slate-400'} />
                  </button>
                  <button
                    onClick={() => setSelectedCountry('djibouti')}
                    className={`px-4 py-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition ${
                      selectedCountry === 'djibouti'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-white text-slate-700 border border-slate-250 hover:bg-slate-100'
                    }`}
                  >
                    <span>Djibouti (Ophtalmologie)</span>
                    <MapPin size={12} className={selectedCountry === 'djibouti' ? 'text-white' : 'text-slate-400'} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Map/Display Column */}
            <div className="lg:col-span-7">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs relative">
                
                {/* Visual Representation of Active Node */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCountry}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {/* Node Header */}
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Globe className="h-5 w-5 animate-spin-slow" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold">PÔLE OPÉRATIONNEL ACTIF</span>
                        <h4 className="text-lg font-bold text-slate-900 font-display">{currentCountry.name}</h4>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 font-medium">
                      {currentCountry.role}
                    </p>

                    <ol className="border-l-2 border-emerald-100 space-y-3.5 pl-4 pt-1 text-xs">
                      <li className="space-y-0.5">
                        <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">Effectif sur Site</span>
                        <div className="font-semibold text-slate-800">{currentCountry.engineers}</div>
                      </li>
                      <li className="space-y-0.5">
                        <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">Adresse administrative</span>
                        <div className="font-semibold text-slate-800 flex items-center gap-1">
                          <MapPin size={11} className="text-emerald-600" />
                          {currentCountry.address}
                        </div>
                      </li>
                      <li className="space-y-0.5">
                        <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">Coordonnées directes</span>
                        <div className="font-semibold text-emerald-700 flex items-center gap-1">
                          <Phone size={11} />
                          {currentCountry.contact}
                        </div>
                      </li>
                    </ol>
                  </motion.div>
                </AnimatePresence>

                {/* Micro mini-map graphic (beautifully styled abstract node graph representing Africa) */}
                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">RESEAU D'INGÉNIERIE STRATÉGIQUE</span>
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="h-2 w-2 rounded-full bg-slate-300"></span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
