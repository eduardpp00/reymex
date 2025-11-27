export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  isVerified?: boolean;
  bio?: string;
  stats?: {
    followers: number;
    following: number;
    posts: number;
  };
  themeColor?: string; // Hex color for profile accent
}

export interface Story {
  id: string;
  user: User;
  imageUrl: string;
  hasUnseen: boolean;
}

export enum PostType {
  IMAGE = 'IMAGE',
  CAROUSEL = 'CAROUSEL',
  REEL = 'REEL', // "Carros"
}

export interface Post {
  id: string;
  user: User;
  type: PostType;
  imageUrls: string[];
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  likedByMe: boolean;
  savedByMe: boolean;
  tags: string[];
}

export interface Interest {
  id: string;
  label: string;
  category: string;
  imageUrl: string;
}

export type ThemeStyle = 'MINIMAL_LUX' | 'NEON_CUSTOM';

export interface AppConfig {
  theme: ThemeStyle;
  accentColor: string;
}