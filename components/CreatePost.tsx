import React, { useState, useRef } from 'react';
import { ImagePlus, X, ArrowLeft } from 'lucide-react';
import { Button, Input } from './UI';
import { Post, PostType, User } from '../types';

interface CreatePostProps {
  currentUser: User;
  onPostCreated: (post: Post) => void;
  onCancel: () => void;
  accentColor: string;
}

export const CreatePost: React.FC<CreatePostProps> = ({ currentUser, onPostCreated, onCancel, accentColor }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmit = () => {
    if (!imagePreview) return;

    setLoading(true);

    // Simula um delay de network
    setTimeout(() => {
      const newPost: Post = {
        id: `new_${Date.now()}`,
        user: currentUser,
        type: PostType.IMAGE,
        imageUrls: [imagePreview],
        caption: caption,
        likes: 0,
        comments: 0,
        timestamp: 'Agora',
        likedByMe: false,
        savedByMe: false,
        tags: ['NewPost'] // Tag padrão
      };

      onPostCreated(newPost);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-reymax-black animate-in slide-in-from-bottom duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <button onClick={onCancel} className="text-white">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-lg font-bold text-white font-serif">Nova Publicação</h2>
        <Button 
          variant="ghost" 
          onClick={handleSubmit} 
          disabled={!imagePreview || loading}
          style={{ color: imagePreview ? accentColor : 'gray' }}
        >
          {loading ? '...' : 'Compartilhar'}
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center">
        
        {/* Image Uploader */}
        <div 
          className={`
            w-full aspect-square bg-reymax-card rounded-xl border-2 border-dashed 
            flex flex-col items-center justify-center relative overflow-hidden transition-all
            ${!imagePreview ? 'border-white/20 hover:border-white/40 cursor-pointer' : 'border-transparent'}
          `}
          onClick={() => !imagePreview && fileInputRef.current?.click()}
        >
          {imagePreview ? (
            <>
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setImagePreview(null);
                }}
                className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full backdrop-blur-md hover:bg-black/80"
              >
                <X size={20} />
              </button>
            </>
          ) : (
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <ImagePlus size={32} className="text-gray-400" />
              </div>
              <p className="text-white font-medium mb-1">Selecione uma foto</p>
              <p className="text-xs text-gray-500">JPG, PNG ou GIF</p>
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        {/* Caption */}
        {imagePreview && (
          <div className="w-full mt-6 animate-in fade-in duration-500">
            <div className="flex gap-3 items-start mb-4">
               <div className="w-10 h-10 rounded-full overflow-hidden">
                 <img src={currentUser.avatarUrl} className="w-full h-full object-cover" />
               </div>
               <div className="flex-1">
                 <textarea 
                   value={caption}
                   onChange={(e) => setCaption(e.target.value)}
                   placeholder="Escreva uma legenda..."
                   className="w-full bg-transparent text-white placeholder-gray-500 border-none focus:ring-0 resize-none text-sm p-0"
                   rows={3}
                 />
               </div>
            </div>
            
            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between items-center py-3 text-white border-b border-white/5 cursor-pointer">
                <span className="text-sm">Adicionar Localização</span>
                <span className="text-gray-500 text-lg">›</span>
              </div>
              <div className="flex justify-between items-center py-3 text-white border-b border-white/5 cursor-pointer">
                <span className="text-sm">Marcar Pessoas</span>
                <span className="text-gray-500 text-lg">›</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
