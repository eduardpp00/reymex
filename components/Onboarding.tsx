import React, { useState } from 'react';
import { Interest } from '../types';
import { Button } from './UI';
import { Check } from 'lucide-react';

interface OnboardingProps {
  interests: Interest[];
  onComplete: () => void;
  accentColor: string;
}

export const InterestSelector: React.FC<OnboardingProps> = ({ interests, onComplete, accentColor }) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleInterest = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  return (
    <div className="min-h-screen bg-reymax-black flex flex-col items-center">
      {/* Container Principal Centralizado */}
      <div className="w-full max-w-6xl p-6 md:p-12 flex flex-col flex-1">
        
        <div className="max-w-2xl mx-auto text-center md:text-left w-full mb-8">
          <h1 className="text-3xl md:text-5xl font-serif text-white mb-4">Defina seu Mundo.</h1>
          <p className="text-gray-400 text-lg">Selecione 3 ou mais tópicos para personalizarmos seu feed Premium.</p>
        </div>

        {/* Grid Responsivo */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 flex-1 pb-24">
          {interests.map(interest => {
            const isSelected = selectedIds.has(interest.id);
            return (
              <div 
                key={interest.id}
                onClick={() => toggleInterest(interest.id)}
                className={`
                  relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 group
                  ${isSelected ? 'ring-2 ring-offset-4 ring-offset-reymax-black scale-95' : 'hover:scale-[1.02]'}
                `}
                style={{ 
                  boxShadow: isSelected ? `0 0 20px ${accentColor}40` : 'none',
                  borderColor: isSelected ? accentColor : 'transparent'
                }}
              >
                {/* Visual Border for selection */}
                <div 
                  className={`absolute inset-0 border-2 transition-colors z-30 rounded-xl pointer-events-none ${isSelected ? '' : 'border-transparent'}`}
                  style={{ borderColor: isSelected ? accentColor : 'transparent' }}
                />

                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                <img src={interest.imageUrl} alt={interest.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                
                <div className="absolute bottom-3 left-3 z-20">
                  <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider block mb-1">{interest.category}</span>
                  <span className="text-white font-medium leading-tight block text-lg">{interest.label}</span>
                </div>

                {isSelected && (
                  <div 
                    className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center text-black shadow-lg"
                    style={{ backgroundColor: accentColor }}
                  >
                    <Check size={18} strokeWidth={3} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Fixo */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-reymax-black via-reymax-black/95 to-transparent z-50">
        <div className="max-w-md mx-auto w-full">
          <div className="flex justify-between items-center text-sm text-gray-400 mb-4 font-medium">
            <span>{selectedIds.size} selecionados</span>
            <span>Mínimo: 3</span>
          </div>
          <Button 
            fullWidth 
            size="lg" 
            onClick={onComplete}
            disabled={selectedIds.size < 3}
            accentColor={accentColor}
            className={`shadow-2xl ${selectedIds.size < 3 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
          >
            Entrar na Reymax
          </Button>
        </div>
      </div>
    </div>
  );
};