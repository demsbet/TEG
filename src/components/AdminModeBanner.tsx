import { useState } from 'react';
import { Lock, Eye, Edit2, Check, Sparkles } from 'lucide-react';

interface AdminModeBannerProps {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

export default function AdminModeBanner({ isAdmin, setIsAdmin }: AdminModeBannerProps) {
  const [showNotification, setShowNotification] = useState(true);

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-white py-2 px-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-xs font-mono text-slate-300">
            {isAdmin ? '🔴 MODE ADMINISTRATEUR ACTIF' : '💻 SITE VISITEUR SIMPLIFIÉ'}
          </span>
          {showNotification && (
            <span className="hidden md:inline-flex items-center gap-1 bg-emerald-950 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-medium border border-emerald-800">
              <Sparkles className="h-3 w-3" /> Vous pouvez éditer tous les textes en direct!
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              isAdmin 
                ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold shadow-sm' 
                : 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/20'
            }`}
          >
            {isAdmin ? (
              <>
                <Eye size={12} className="stroke-[3]" />
                Quitter l'Éditeur
              </>
            ) : (
              <>
                <Lock size={12} />
                Activer le Mode Éditeur Admin
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
