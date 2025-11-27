import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, CheckCircle2 } from 'lucide-react';
import { Post, Story, PostType } from '../types';
import { Avatar } from './UI';

interface StoriesRailProps {
  stories: Story[];
  accentColor: string;
}

export const StoriesRail: React.FC<StoriesRailProps> = ({ stories, accentColor }) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-4 pl-4 border-b border-white/5 bg-reymax-black/50 backdrop-blur-md sticky top-0 z-10">
      <div className="flex space-x-4">
        {/* Current User Add Story */}
        <div className="flex flex-col items-center space-y-1 min-w-[70px]">
          <div className="relative">
            <Avatar url="https://picsum.photos/id/64/200/200" size="lg" />
            <div className="absolute bottom-0 right-0 bg-white text-black rounded-full p-0.5 border-2 border-black">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
          </div>
          <span className="text-xs text-gray-400 font-medium">Seu story</span>
        </div>

        {stories.map(story => (
          <div key={story.id} className="flex flex-col items-center space-y-1 min-w-[70px] cursor-pointer">
            <Avatar 
              url={story.user.avatarUrl} 
              size="lg" 
              hasRing={story.hasUnseen} 
              ringColor={story.hasUnseen ? accentColor : undefined}
            />
            <span className="text-xs text-gray-300 font-medium truncate w-16 text-center">{story.user.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

interface PostCardProps {
  post: Post;
  accentColor: string;
}

export const PostCard: React.FC<PostCardProps> = ({ post, accentColor }) => {
  const [liked, setLiked] = useState(post.likedByMe);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [saved, setSaved] = useState(post.savedByMe);

  const toggleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  const isReel = post.type === PostType.REEL;

  return (
    <div className="mb-6 bg-reymax-black border-b border-reymax-border/50 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <Avatar url={post.user.avatarUrl} size="md" />
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-white hover:text-gray-200 cursor-pointer">
                {post.user.username}
              </span>
              {post.user.isVerified && <CheckCircle2 size={12} fill={accentColor} className="text-black" />}
            </div>
            <span className="text-xs text-gray-500">{post.user.displayName} • {post.timestamp}</span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Media */}
      <div className={`relative w-full overflow-hidden bg-reymax-card ${isReel ? 'aspect-[4/5]' : 'aspect-square'}`}>
        <img 
          src={post.imageUrls[0]} 
          alt="Post content" 
          className="w-full h-full object-cover"
        />
        {post.type === PostType.CAROUSEL && (
           <div className="absolute top-4 right-4 bg-black/50 px-2 py-1 rounded-full text-xs text-white backdrop-blur-sm">
             1/{post.imageUrls.length}
           </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button onClick={toggleLike} className="transition-transform active:scale-125">
              <Heart 
                size={26} 
                className={liked ? "fill-current" : "text-white"} 
                style={{ color: liked ? '#ef4444' : undefined }}
              />
            </button>
            <button className="text-white hover:text-gray-300 transition-transform active:scale-95">
              <MessageCircle size={26} />
            </button>
            <button className="text-white hover:text-gray-300 transition-transform active:scale-95">
              <Send size={26} />
            </button>
          </div>
          <button onClick={() => setSaved(!saved)} className="transition-transform active:scale-125">
            <Bookmark 
              size={26} 
              className={saved ? "fill-current text-white" : "text-white"} 
            />
          </button>
        </div>

        <div className="text-sm font-semibold mb-2">{likesCount.toLocaleString()} curtidas</div>
        
        <div className="text-sm text-gray-200">
          <span className="font-semibold mr-2">{post.user.username}</span>
          {post.caption}
        </div>
        
        {post.tags.length > 0 && (
          <div className="mt-2 flex gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs text-gray-400">#{tag}</span>
            ))}
          </div>
        )}

        <div className="mt-2 text-sm text-gray-500 cursor-pointer">
          Ver todos os {post.comments} comentários
        </div>
      </div>
    </div>
  );
};