import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CompanyInfo, Service } from '../types';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Smartphone, 
  Bookmark, 
  Check, 
  Printer, 
  Clock, 
  Send,
  Sparkles,
  Award
} from 'lucide-react';

interface ContactDevisSectionProps {
  companyInfo: CompanyInfo;
  services: Service[];
  selectedServiceId: string | null;
  isAdmin: boolean;
  onUpdateCompany: (info: CompanyInfo) => void;
}

export default function ContactDevisSection({
  companyInfo,
  services,
  selectedServiceId,
  isAdmin,
  onUpdateCompany
}: ContactDevisSectionProps) {
  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isMessageSent, setIsMessageSent] = useState(false);

  // Quote / Devis Simulation State
  const [selectedServices, setSelectedServices] = useState<string[]>(
    selectedServiceId ? [selectedServiceId] : []
  );
  const [institutionName, setInstitutionName] = useState('');
  const [institutionType, setInstitutionType] = useState('Hôpital Général / Régional');
  const [equipmentUrgency, setEquipmentUrgency] = useState('Sous 3 mois');
  const [targetRegion, setTargetRegion] = useState('Cameroun');
  const [additionalQuoteDetails, setAdditionalQuoteDetails] = useState('');
  const [generatedDevisRef, setGeneratedDevisRef] = useState<string | null>(null);
  const [showInvoicePrintSummary, setShowInvoicePrintSummary] = useState(false);

  // Quick state update if service selection changed from outside props
  React.useEffect(() => {
    if (selectedServiceId) {
      if (!selectedServices.includes(selectedServiceId)) {
        setSelectedServices([...selectedServices, selectedServiceId]);
      }
      const el = document.getElementById('devis-builder');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedServiceId]);

  // Company Coordinates for Admin Update
  const [phone, setPhone] = useState(companyInfo.phone);
  const [phone2, setPhone2] = useState(companyInfo.phone2 || '');
  const [email, setEmail] = useState(companyInfo.email);
  const [address, setAddress] = useState(companyInfo.address);

  const handleUpdateCoordinates = () => {
    onUpdateCompany({
      ...companyInfo,
      phone,
      phone2,
      email,
      address
    });
    alert('Coordonnées de l\'entreprise mises à jour avec succès.');
  };

  const handleServiceSelectToggle = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleGenerateQuoteInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedServices.length === 0 || !institutionName.trim()) {
      alert('Veuillez sélectionner au moins un service et renseigner le nom de votre établissement.');
      return;
    }
    const randCode = 'TEG-DEV-' + Math.floor(1000 + Math.random() * 9000);
    setGeneratedDevisRef(randCode);
    setShowInvoicePrintSummary(true);
  };

  const handleSendRegularMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMessageSent(true);
    setTimeout(() => {
      // Clear forms
      setContactName('');
      setContactPhone('');
      setContactEmail('');
      setContactSubject('');
      setContactMessage('');
    }, 200);
  };

  return (
    <section id="contact" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest font-mono bg-emerald-50 px-3 py-1 rounded-full">
            Prise de Contact & Devis
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 leading-tight">
            Prêt à Moderniser Votre Plateau Technique ?
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-sans">
            Remplissez notre simulateur de devis biomédical ou envoyez-nous simplement un message direct. Notre équipe technique vous répondra en moins de 24 heures.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* LEFT 5 COLS: Company info & Coordinates */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block tracking-widest">Coordonnées Officielles</span>
              <h3 className="text-2xl font-display font-bold text-slate-950">Siège Social de TEG</h3>
              <p className="text-sm text-slate-600">
                Nos équipes interviennent en urgence dans toute la sous-région d'Afrique Centrale. N'hésitez pas à nous appeler directement ou à initier une discussion sur WhatsApp.
              </p>
            </div>

            {/* Editing coordinates exclusively for Admin */}
            {isAdmin ? (
              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 mt-4 space-y-3.5 text-xs">
                <span className="font-bold text-emerald-700 block">⚙️ Administrateur - Modifier les Coordonnées</span>
                
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold uppercase block text-[9px]">Téléphone Principal</label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border border-slate-200 rounded px-2 py-1" />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold uppercase block text-[9px]">Téléphone Secondaire (SAV)</label>
                  <input type="text" value={phone2} onChange={(e) => setPhone2(e.target.value)} className="w-full border border-slate-200 rounded px-2 py-1" />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold uppercase block text-[9px]">Adresse E-mail</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-slate-200 rounded px-2 py-1" />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold uppercase block text-[9px]">Adresse Physique</label>
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border border-slate-200 rounded px-2 py-1" />
                </div>

                <button onClick={handleUpdateCoordinates} className="bg-emerald-600 text-white font-bold p-2 px-3 rounded-lg hover:bg-emerald-700">
                  Enregistrer les Coordonnées
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                
                {/* Coordinate card 1 */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-150">
                  <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
                    <Phone size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Hotline & Assistance SAV</span>
                    <a href={`tel:${companyInfo.phone}`} className="font-bold text-slate-800 text-sm hover:underline hover:text-emerald-700 block">
                      {companyInfo.phone}
                    </a>
                    {companyInfo.phone2 && (
                      <a href={`tel:${companyInfo.phone2}`} className="font-bold text-slate-800 text-xs hover:underline block opacity-80">
                        {companyInfo.phone2}
                      </a>
                    )}
                  </div>
                </div>

                {/* Coordinate card 2 */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-150">
                  <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
                    <Mail size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Adresse E-mail Professionnelle</span>
                    <a href={`mailto:${companyInfo.email}`} className="font-bold text-slate-800 text-sm hover:underline hover:text-emerald-700 block">
                      {companyInfo.email}
                    </a>
                  </div>
                </div>

                {/* Coordinate card 3 */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-150">
                  <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
                    <MapPin size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Bureau & Laboratoire Central</span>
                    <span className="font-bold text-slate-800 text-xs block">
                      {companyInfo.address}
                    </span>
                  </div>
                </div>

              </div>
            )}

            {/* Quick launch social actions */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <span className="text-[10px] tracking-wider uppercase font-bold text-slate-400 font-mono block">Canaux de communication instantanés :</span>
              <div className="grid sm:grid-cols-2 gap-3.5">
                <a
                  href={companyInfo.whatsapp}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold text-center transition flex items-center justify-center gap-2 shadow"
                >
                  <Smartphone size={16} />
                  Discuter sur WhatsApp
                </a>
                
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="p-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl text-xs font-bold text-center transition flex items-center justify-center gap-2 border border-slate-200"
                >
                  <Phone size={16} className="text-emerald-600" />
                  Appel Mobile Direct
                </a>
              </div>
            </div>

            {/* Simulated Live Google Maps Area based on Cameroon Douala coordinates */}
            <div className="bg-slate-900 p-5 rounded-3xl border border-slate-850 relative text-left">
              <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 font-bold block mb-2">Simulateur d'Implantation d'Exploitation</span>
              
              <div className="h-44 rounded-2xl bg-slate-950 flex flex-col justify-between p-4 relative overflow-hidden border border-slate-850">
                {/* Radial Grid Map visualization */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                <div className="flex justify-between items-start relative z-10 text-[10px] font-mono text-slate-500">
                  <span>GPS RADAR : OK</span>
                  <span>DOUALA, CAMEROUN</span>
                </div>

                <div className="self-center flex flex-col items-center gap-1.5 relative z-10">
                  <div className="h-10 w-10 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-400/40">
                    <div className="h-4 w-4 bg-emerald-400 rounded-full animate-ping"></div>
                  </div>
                  <span className="text-white text-xs font-bold tracking-tight">Siège Social TEG</span>
                  <span className="text-[9px] text-slate-500">Avenue de la République</span>
                </div>

                <div className="flex justify-between items-end relative z-10 text-[9px] font-mono text-slate-500">
                  <span>COUVERTURE : AFRIQUE CENTRALE</span>
                  <span>98% DISPONIBILITÉ</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT 7 COLS: The Interactive forms */}
          <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200/80">
            
            {/* Nav Tabs for choosing between Devis or Regular Contact */}
            <div className="id-tab-selection flex justify-center gap-2 mb-8">
              <button
                onClick={() => {
                  setShowInvoicePrintSummary(false);
                  setGeneratedDevisRef(null);
                }}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs transition active:scale-95 ${
                  !showInvoicePrintSummary && !generatedDevisRef
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Créer une Demande de Devis
              </button>
              
              <button
                onClick={() => {
                  setGeneratedDevisRef(null);
                  setShowInvoicePrintSummary(false);
                }}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs transition active:scale-95 ${
                  !showInvoicePrintSummary && generatedDevisRef
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Formulaire de Contact Classique
              </button>
            </div>

            {/* --- CASE 1: INVOICE PRINT SUMMARY (DEVIS) --- */}
            <AnimatePresence mode="wait">
              {showInvoicePrintSummary && generatedDevisRef ? (
                <motion.div
                  key="quote-summary"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-left space-y-6"
                >
                  <div className="flex items-center justify-between border-b pb-4 border-slate-100">
                    <div>
                      <span className="text-[10px] tracking-wider uppercase font-mono font-bold text-emerald-600">Estimation Devis Générée</span>
                      <h4 className="text-base font-extrabold text-slate-900 font-display">Réf: {generatedDevisRef}</h4>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      En attente de validation technologique
                    </span>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-slate-400 block font-bold">Établissement :</span>
                        <span className="font-extrabold text-slate-800">{institutionName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-bold">Type :</span>
                        <span className="font-extrabold text-slate-800">{institutionType}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-slate-400 block font-bold">Région d'Intervention :</span>
                        <span className="font-extrabold text-slate-800">{targetRegion}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-bold">Urgence du Projet :</span>
                        <span className="font-extrabold text-slate-800">{equipmentUrgency}</span>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4">
                      <span className="text-slate-400 block font-bold mb-2">Services / Expertises Sélectionnés :</span>
                      <div className="space-y-1.5">
                        {selectedServices.map(srvId => {
                          const srvObj = services.find(x => x.id === srvId);
                          return (
                            <div key={srvId} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                              <span className="font-semibold text-slate-850">{srvObj?.name}</span>
                              <span className="text-[10px] text-emerald-700 font-mono font-bold">Expertise biomédicale intégrée</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {additionalQuoteDetails.trim() && (
                      <div className="border-t border-slate-100 pt-4">
                        <span className="text-slate-400 block font-bold">Spécificités techniques complémentaires :</span>
                        <p className="text-slate-600 italic bg-amber-50/40 p-2.5 rounded border border-amber-100 mt-1">
                          {additionalQuoteDetails}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-5 border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock size={14} className="text-amber-500" />
                      <span>Premier retour sous 24h ouvrées.</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => window.print()}
                        className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg text-xs inline-flex items-center gap-1.5 transition"
                      >
                        <Printer size={14} />
                        Imprimer
                      </button>
                      <button
                        onClick={() => {
                          setShowInvoicePrintSummary(false);
                          setGeneratedDevisRef(null);
                        }}
                        className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition"
                      >
                        Créer un Nouveau Devis
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : !isMessageSent ? (
                // --- CASE 2: SHOWN FORM (INQUIRY / DEVIS BUILDER) ---
                <motion.form
                  key="inquiry-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  id="devis-builder"
                  onSubmit={handleGenerateQuoteInquiry}
                  className="space-y-6 text-left text-xs sm:text-sm"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-emerald-600 block">ÉTAPE 1 : CHOIX DES FILIÈRES TECHNIQUES</span>
                    <label className="font-bold text-slate-700 block">Cochez les compétences requises pour vos travaux :</label>
                    
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {services.map((srv) => {
                        const isChecked = selectedServices.includes(srv.id);
                        return (
                          <div
                            key={srv.id}
                            onClick={() => handleServiceSelectToggle(srv.id)}
                            className={`p-3.5 rounded-xl border cursor-pointer select-none transition flex items-center justify-between ${
                              isChecked
                                ? 'bg-emerald-50 border-emerald-400 text-slate-950 font-semibold'
                                : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                            }`}
                          >
                            <span>{srv.name}</span>
                            <div className={`h-4 w-4 rounded-full border flex items-center justify-center transition ${
                              isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'
                            }`}>
                              {isChecked && <Check size={10} className="stroke-[3]" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-emerald-600 block">ÉTAPE 2 : IDENTIFICATION STRATÉGIQUE</span>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-600">Nom de votre Établissement de Santé *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Clinique des Princes"
                          value={institutionName}
                          onChange={(e) => setInstitutionName(e.target.value)}
                          className="w-full border border-slate-200 hover:border-slate-350 bg-white rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-600">Catégorie d'infrastructures</label>
                        <select
                          value={institutionType}
                          onChange={(e) => setInstitutionType(e.target.value)}
                          className="w-full border border-slate-200 bg-white rounded-lg p-2.5 outline-none"
                        >
                          <option value="Hôpital Général / Régional">Hôpital Général / Régional</option>
                          <option value="Clinique Médicale Privée">Clinique Médicale Privée</option>
                          <option value="Cabinet d'Ophtalmologie / Optique">Cabinet d'Ophtalmologie / Optique</option>
                          <option value="Laboratoire d'Analyses Biologiques">Laboratoire d'Analyses de pointe</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-600">Pays / Zone d'implantation</label>
                        <select
                          value={targetRegion}
                          onChange={(e) => setTargetRegion(e.target.value)}
                          className="w-full border border-slate-200 bg-white rounded-lg p-2.5 outline-none"
                        >
                          <option value="Cameroun">Cameroun</option>
                          <option value="Tchad">Tchad</option>
                          <option value="Djibouti">Djibouti</option>
                          <option value="Autre pays de la sous-région">Autre pays de la sous-région</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-600">Degré d'urgence du besoin</label>
                        <select
                          value={equipmentUrgency}
                          onChange={(e) => setEquipmentUrgency(e.target.value)}
                          className="w-full border border-slate-200 bg-white rounded-lg p-2.5 outline-none"
                        >
                          <option value="Immédiat (Panne ou urgence)">Immédiat (Panne critique / d'urgence)</option>
                          <option value="Sous 30 jours">Sous 30 jours (Planification)</option>
                          <option value="Sous 3 mois">Sous 3 mois (Étude technique)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-600">Détails ou Équipements spécifiques requis (Optionnel)</label>
                      <textarea
                        rows={3}
                        placeholder="Ex: Acquisition d'un échographe portable cardiologie, formation technique des manipulateurs..."
                        value={additionalQuoteDetails}
                        onChange={(e) => setAdditionalQuoteDetails(e.target.value)}
                        className="w-full border border-slate-200 hover:border-slate-350 bg-white rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-3.5 rounded-xl transition hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-emerald-600/10 flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="h-5 w-5 animate-pulse" />
                      Générer l'estimation de Devis Biomédical
                    </button>
                  </div>
                </motion.form>
              ) : (
                // --- CASE 3: INTERACTIVE SUCCESS DISPLAY FOR FORM MAIL SEND ---
                <motion.div
                  key="mail-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-5"
                >
                  <div className="h-12 w-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                    <Check size={24} className="stroke-[3]" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-display font-extrabold text-slate-900 text-lg">Message envoyé avec succès!</h3>
                    <p className="text-slate-500 font-sans text-xs">
                      Nous vous remercions pour l'intérêt porté à Tenfi Engineering Group. Nos équipes et ingénieurs biomédicaux analysent vos critères de maintenance ou d'acquisition. Un expert vous contactera.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setIsMessageSent(false)}
                      className="bg-slate-900 text-white font-semibold text-xs px-5 py-2.5 rounded-xl hover:bg-slate-800 transition"
                    >
                      Envoyer un Autre Message
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
