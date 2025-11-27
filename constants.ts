import { Interest, Post, PostType, Story, User } from './types';

export const CURRENT_USER: User = {
  id: 'me',
  username: 'reymax_creator',
  displayName: 'Alex Rey',
  avatarUrl: 'https://picsum.photos/id/64/200/200',
  isVerified: true,
  bio: 'Curating aesthetics. Living the Premium II lifestyle. 🇧🇷',
  stats: {
    followers: 12500,
    following: 420,
    posts: 89
  },
  themeColor: '#D4AF37'
};

export const MOCK_INTERESTS: Interest[] = [
  { id: '1', label: 'Fotografia Minimalista', category: 'Arte', imageUrl: 'https://picsum.photos/id/20/300/300' },
  { id: '2', label: 'Tech Setup', category: 'Tecnologia', imageUrl: 'https://picsum.photos/id/3/300/300' },
  { id: '3', label: 'Cafés Especiais', category: 'Gastronomia', imageUrl: 'https://picsum.photos/id/1060/300/300' },
  { id: '4', label: 'Moda Streetwear', category: 'Estilo', imageUrl: 'https://picsum.photos/id/103/300/300' },
  { id: '5', label: 'Arquitetura Brutalista', category: 'Design', imageUrl: 'https://picsum.photos/id/1076/300/300' },
  { id: '6', label: 'Viagens Exóticas', category: 'Viagem', imageUrl: 'https://picsum.photos/id/1036/300/300' },
  { id: '7', label: 'Alta Relojoaria', category: 'Luxo', imageUrl: 'https://picsum.photos/id/175/300/300' },
  { id: '8', label: 'Carros Esportivos', category: 'Auto', imageUrl: 'https://picsum.photos/id/111/300/300' },
];

export const MOCK_STORIES: Story[] = [
  {
    id: 's1',
    user: { id: 'u1', username: 'ana.photo', displayName: 'Ana Silva', avatarUrl: 'https://picsum.photos/id/1027/100/100' },
    imageUrl: 'https://picsum.photos/id/1027/400/800',
    hasUnseen: true,
  },
  {
    id: 's2',
    user: { id: 'u2', username: 'carlos_dev', displayName: 'Carlos Dev', avatarUrl: 'https://picsum.photos/id/1005/100/100' },
    imageUrl: 'https://picsum.photos/id/1005/400/800',
    hasUnseen: true,
  },
  {
    id: 's3',
    user: { id: 'u3', username: 'lux_travel', displayName: 'Lux Trips', avatarUrl: 'https://picsum.photos/id/1011/100/100', isVerified: true },
    imageUrl: 'https://picsum.photos/id/1011/400/800',
    hasUnseen: false,
  },
  {
    id: 's4',
    user: { id: 'u4', username: 'art_daily', displayName: 'Arte Diária', avatarUrl: 'https://picsum.photos/id/1015/100/100' },
    imageUrl: 'https://picsum.photos/id/1015/400/800',
    hasUnseen: false,
  },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    user: { id: 'u5', username: 'urban_explo', displayName: 'Urban Explorer', avatarUrl: 'https://picsum.photos/id/1025/100/100' },
    type: PostType.IMAGE,
    imageUrls: ['https://picsum.photos/id/237/800/800'],
    caption: 'Encontrando beleza no caos urbano. 🏙️ #citylife #reymax',
    likes: 1240,
    comments: 45,
    timestamp: '2h',
    likedByMe: true,
    savedByMe: false,
    tags: ['Fotografia', 'Urbano']
  },
  {
    id: 'p2',
    user: { id: 'u3', username: 'lux_travel', displayName: 'Lux Trips', avatarUrl: 'https://picsum.photos/id/1011/100/100', isVerified: true },
    type: PostType.CAROUSEL,
    imageUrls: ['https://picsum.photos/id/28/800/1000', 'https://picsum.photos/id/29/800/1000'],
    caption: 'Fim de semana nas montanhas. Desconectando para reconectar. 🏔️✨',
    likes: 8500,
    comments: 210,
    timestamp: '5h',
    likedByMe: false,
    savedByMe: true,
    tags: ['Viagem', 'Natureza']
  },
  {
    id: 'p3',
    user: { id: 'u6', username: 'neon_rider', displayName: 'Neon Rider', avatarUrl: 'https://picsum.photos/id/146/100/100' },
    type: PostType.REEL,
    imageUrls: ['https://picsum.photos/id/146/400/700'],
    caption: 'Night vibes only. 🌙 A estética dessa cidade à noite é incomparável.',
    likes: 3200,
    comments: 112,
    timestamp: '1d',
    likedByMe: false,
    savedByMe: false,
    tags: ['Vibe', 'Noite']
  }
];