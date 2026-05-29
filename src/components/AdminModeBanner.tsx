import React, { useState } from 'react';
import { Settings, Lock, Eye, X, Sparkles, KeyRound } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminModeBannerProps {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
}

export default function AdminModeBanner({ isAdmin, setIsAdmin, isModalOpen, setIsModalOpen }: AdminModeBannerProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setPassword('');
    setError(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPassword('');
    setError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Le mot de passe attendu pour l'administration est "admin"
    if (password.trim().toLowerCase() === 'admin') {
      setIsAdmin(true);
      handleCloseModal();
    } else {
      setError(true);
    }
  };

  return (
    <>
      {/* 1. Bandeau admin visible UNIQUEMENT quand isAdmin est activé */}
      {isAdmin && (
        <div className="bg-slate-900 border-b border-emerald-500/20 text-white py-2 px-4 sticky top-0 z-[100] shadow-md animate-slide-down">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-xs font-mono text-slate-300 font-bold tracking-wider">
                🔴 MODE CONFIGURATION ACTIF
              </span>
              <span className="hidden md:inline-flex items-center gap-1 bg-emerald-950 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-medium border border-emerald-800">
                <Sparkles className="h-3 w-3" /> Vous pouvez éditer les textes à l'écran en direct !
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAdmin(false)}
                className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-full text-xs font-bold font-sans transition-all shadow-sm cursor-pointer"
              >
                <Eye size={12} className="stroke-[3]" />
                Quitter l'Éditeur
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Modal de mot de passe sécurisé et esthétique */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            {/* Modal Content Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 z-10 overflow-hidden text-left"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col items-center text-center mt-2 mb-6">
                <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <Lock size={22} className="stroke-[2.5]" />
                </div>
                <h3 className="font-display font-extrabold text-slate-900 text-lg leading-snug">
                  Accès Administration
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Veuillez entrer le mot de passe administrateur pour déverrouiller l'édition du site.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound size={16} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError(false);
                    }}
                    placeholder="Mot de passe"
                    autoFocus
                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition-all ${
                      error 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-100 text-red-950' 
                        : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 text-slate-900'
                    }`}
                  />
                  {error && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1.5 flex items-center gap-1 font-sans">
                      ⚠️ Mot de passe incorrect
                    </p>
                  )}
                </div>

                <div className="text-[10px] text-slate-500 bg-slate-50 border border-slate-100 p-2.5 rounded-lg flex items-center justify-between">
                  <span>Mot de passe par défaut :</span>
                  <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600 font-bold">admin</span>
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-emerald-650 hover:bg-emerald-700 bg-emerald-600 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-600/10 hover:shadow-emerald-700/20 cursor-pointer"
                  >
                    Se connecter
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
