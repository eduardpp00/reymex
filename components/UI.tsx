import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  accentColor?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  accentColor,
  className = '',
  style,
  ...props 
}) => {
  const baseStyles = "rounded-lg font-medium transition-all duration-200 active:scale-95 flex items-center justify-center";
  
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3.5 text-base",
  };

  const variants = {
    primary: `text-black shadow-lg shadow-white/5`,
    secondary: "bg-reymax-card text-white hover:bg-reymax-border",
    ghost: "bg-transparent text-gray-400 hover:text-white",
    outline: "bg-transparent border border-reymax-border text-white hover:border-white/50"
  };

  const dynamicStyle = variant === 'primary' 
    ? { backgroundColor: accentColor || 'white', ...style }
    : style;

  return (
    <button 
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      style={dynamicStyle}
      {...props}
    >
      {children}
    </button>
  );
};

export const Avatar: React.FC<{ url: string; size?: 'sm' | 'md' | 'lg' | 'xl'; hasRing?: boolean; ringColor?: string }> = ({ 
  url, 
  size = 'md',
  hasRing = false,
  ringColor = 'white'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={`relative ${sizeClasses[size]} rounded-full p-[2px]`} style={{ background: hasRing ? `linear-gradient(45deg, ${ringColor}, transparent)` : 'transparent' }}>
       <img src={url} alt="Avatar" className="w-full h-full rounded-full object-cover border-2 border-reymax-black" />
    </div>
  );
};

export const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-semibold tracking-wider text-white uppercase border border-white/10 backdrop-blur-sm">
    {children}
  </span>
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input 
    {...props}
    className="w-full bg-reymax-card border border-reymax-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
  />
);