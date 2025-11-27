import React from 'react';
import { User, Post } from '../types';
import { Avatar, Button } from './UI';
import { Grid, Tag, Settings, MapPin, Link as LinkIcon } from 'lucide-react';

interface ProfileProps {
  user: User;
  posts: Post[];
  accentColor: string;
}

export const Profile: React.FC<ProfileProps> = ({ user, posts, accentColor }) => {
  return (
    <div className="min-h-screen pb-20">
      {/* Cover / Header Area */}
      <div className="relative pt-8 px-4 pb-6 bg-gradient-to-b from-white/5 to-transparent">
        <div className="flex justify-between items-start mb-6">
           <Avatar url={user.avatarUrl} size="xl" hasRing ringColor={accentColor} />
           <div className="flex gap-4 text-center mr-4 mt-2">
              <div>
                <div className="font-bold text-lg text-white">{user.stats?.posts}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Posts</div>
              </div>
              <div>
                <div className="font-bold text-lg text-white">{user.stats?.followers}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Seguidores</div>
              </div>
              <div>
                <div className="font-bold text-lg text-white">{user.stats?.following}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Seguindo</div>
              </div>
           </div>
        </div>

        <div className="space-y-3">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-1 font-serif">
              {user.displayName}
              {user.isVerified && <span style={{ color: accentColor }}>✦</span>}
            </h1>
            <p className="text-sm text-gray-400 font-medium">@{user.username}</p>
          </div>
          
          <p className="text-sm text-gray-200 leading-relaxed max-w-md">
            {user.bio}
          </p>

          <div className="flex flex-col gap-1 text-xs text-gray-400">
             <div className="flex items-center gap-1">
                <MapPin size={12} /> São Paulo, SP
             </div>
             <div className="flex items-center gap-1 text-white hover:underline cursor-pointer">
                <LinkIcon size={12} /> reymax.social/alex
             </div>
          </div>

          <div className="flex gap-2 mt-4">
             <Button fullWidth size="sm" variant="primary" accentColor={accentColor}>Editar Perfil</Button>
             <Button fullWidth size="sm" variant="secondary">Compartilhar</Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-t border-white/10 mt-2">
        <button className="flex-1 py-3 border-b-2 flex justify-center" style={{ borderColor: accentColor }}>
           <Grid size={20} color={accentColor} />
        </button>
        <button className="flex-1 py-3 border-b-2 border-transparent text-gray-500 flex justify-center">
           <Tag size={20} />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-0.5 mt-0.5">
        {posts.map(post => (
          <div key={post.id} className="aspect-square relative group bg-reymax-card cursor-pointer overflow-hidden">
             <img src={post.imageUrls[0]} className="w-full h-full object-cover transition duration-300 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
             {post.type !== 'IMAGE' && (
               <div className="absolute top-1 right-1">
                 <Settings size={12} className="text-white drop-shadow-md" /> 
               </div>
             )}
          </div>
        ))}
        {/* Fillers to make grid look full */}
        {[1,2,3].map(i => (
          <div key={i} className="aspect-square bg-reymax-card animate-pulse opacity-5"></div>
        ))}
      </div>
    </div>
  );
};