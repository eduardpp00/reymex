import React, { useState } from 'react';
import { Home, Search, PlusSquare, Heart, User, Sparkles, LogOut, Settings, Bell } from 'lucide-react';
import { MOCK_POSTS, MOCK_STORIES, CURRENT_USER, MOCK_INTERESTS } from './constants';
import { AppConfig, Post } from './types';
import { StoriesRail, PostCard } from './components/Feed';
import { Profile } from './components/Profile';
import { InterestSelector } from './components/Onboarding';
import { CreatePost } from './components/CreatePost';
import { Avatar, Button } from './components/UI';

type View = 'ONBOARDING' | 'FEED' | 'PROFILE' | 'SETTINGS' | 'CREATE';

const App = () => {
  const [currentView, setCurrentView] = useState<View>('ONBOARDING');
  const [config, setConfig] = useState<AppConfig>({
    theme: 'MINIMAL_LUX',
    accentColor: '#D4AF37' // Gold default
  });

  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [activeTab, setActiveTab] = useState('home');

  const handleOnboardingComplete = () => {
    setCurrentView('FEED');
    setActiveTab('home');
  };

  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts]);
    setCurrentView('FEED');
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Components for Navigation ---

  const NavItem = ({ name, icon: Icon, label, active, onClick }: any) => (
    <button 
      onClick={onClick}
      className={`
        flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group w-full
        ${active ? 'bg-white/5' : 'hover:bg-white/5'}
      `}
    >
      <Icon 
        size={26} 
        strokeWidth={active ? 2.5 : 2}
        color={active ? config.accentColor : 'currentColor'} 
        className={`transition-transform group-hover:scale-105 ${active ? '' : 'text-gray-400'}`}
      />
      <span className={`font-medium hidden md:block ${active ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
        {label}
      </span>
    </button>
  );

  const MobileNavIcon = ({ name, icon: Icon, active }: { name: string, icon: any, active: boolean }) => (
    <button 
      onClick={() => {
        setActiveTab(name);
        if (name === 'profile') setCurrentView('PROFILE');
        else if (name === 'home') setCurrentView('FEED');
        else if (name === 'create') setCurrentView('CREATE');
        else if (name === 'settings') setCurrentView('SETTINGS');
      }}
      className={`p-2 transition-all duration-300 ${active ? '-translate-y-1' : 'text-gray-500 hover:text-gray-300'}`}
    >
      <Icon 
        size={26} 
        strokeWidth={active ? 2.5 : 2}
        color={active ? config.accentColor : 'currentColor'} 
        fill={active && name === 'home' ? config.accentColor : 'none'}
      />
    </button>
  );

  const ThemeCustomizer = () => (
    <div className="p-6">
      <h2 className="text-2xl font-serif text-white mb-8">Personalização</h2>
      
      <div className="mb-8">
        <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-4">Estilo do Tema</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => setConfig({ ...config, theme: 'MINIMAL_LUX', accentColor: '#D4AF37' })}
            className={`p-4 rounded-xl border text-left transition-all ${config.theme === 'MINIMAL_LUX' ? 'border-amber-500 bg-white/5' : 'border-white/10 hover:border-white/30'}`}
          >
            <div className="font-serif text-amber-500 text-xl mb-1">Minimal Lux</div>
            <div className="text-xs text-gray-500">Sóbrio, Dourado, Serifado.</div>
          </button>
          
          <button 
            onClick={() => setConfig({ ...config, theme: 'NEON_CUSTOM', accentColor: '#b026ff' })}
            className={`p-4 rounded-xl border text-left transition-all ${config.theme === 'NEON_CUSTOM' ? 'border-fuchsia-500 bg-white/5' : 'border-white/10 hover:border-white/30'}`}
          >
            <div className="font-sans text-fuchsia-500 text-xl mb-1 font-bold">Neon Custom</div>
            <div className="text-xs text-gray-500">Moderno, Vibrante, Arredondado.</div>
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-4">Cor de Destaque</h3>
        <div className="flex gap-4 flex-wrap">
          {['#D4AF37', '#b026ff', '#00d2ff', '#ff3b30', '#32d74b', '#ff7b00'].map(c => (
             <button
               key={c}
               onClick={() => setConfig({ ...config, accentColor: c })}
               className={`w-12 h-12 rounded-full border-2 transition-transform hover:scale-110 ${config.accentColor === c ? 'border-white scale-110' : 'border-transparent'}`}
               style={{ backgroundColor: c }}
             />
          ))}
        </div>
      </div>
    </div>
  );

  // --- RENDER ---

  if (currentView === 'ONBOARDING') {
    return <InterestSelector interests={MOCK_INTERESTS} onComplete={handleOnboardingComplete} accentColor={config.accentColor} />;
  }

  return (
    <div className={`min-h-screen bg-reymax-black text-gray-100 font-sans flex flex-col md:flex-row ${config.theme === 'MINIMAL_LUX' ? 'font-sans' : 'font-sans'}`}>
      
      {/* --- DESKTOP SIDEBAR (Visible on md+) --- */}
      <aside className="hidden md:flex flex-col w-[250px] lg:w-[280px] h-screen sticky top-0 border-r border-white/5 p-6 justify-between bg-reymax-black z-20">
        <div>
          <div className="mb-10 pl-2 cursor-pointer" onClick={() => { setCurrentView('FEED'); setActiveTab('home'); }}>
            <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Reymax</h1>
          </div>
          
          <nav className="space-y-2">
            <NavItem name="home" icon={Home} label="Feed Principal" active={activeTab === 'home'} 
              onClick={() => { setActiveTab('home'); setCurrentView('FEED'); }} />
            <NavItem name="search" icon={Search} label="Explorar" active={activeTab === 'search'} 
              onClick={() => { setActiveTab('search'); }} />
            <NavItem name="create" icon={PlusSquare} label="Criar Post" active={activeTab === 'create'} 
              onClick={() => { setActiveTab('create'); setCurrentView('CREATE'); }} />
            <NavItem name="profile" icon={User} label="Perfil" active={activeTab === 'profile'} 
              onClick={() => { setActiveTab('profile'); setCurrentView('PROFILE'); }} />
            <NavItem name="settings" icon={Sparkles} label="Personalizar" active={activeTab === 'settings'} 
              onClick={() => { setActiveTab('settings'); setCurrentView('SETTINGS'); }} />
          </nav>
        </div>

        <div className="border-t border-white/10 pt-6">
           <button className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-full p-2">
              <LogOut size={20} />
              <span className="font-medium">Sair</span>
           </button>
        </div>
      </aside>

      {/* --- MOBILE HEADER (Visible on sm only) --- */}
      <header className="md:hidden sticky top-0 z-30 bg-reymax-black/90 backdrop-blur-lg border-b border-white/5 px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-serif font-bold text-white" onClick={() => setCurrentView('FEED')}>Reymax</h1>
        <div className="flex gap-4">
           <button className="text-white relative">
              <Heart size={24} />
           </button>
           <button className="text-white relative">
              <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
              <Bell size={24} />
           </button>
        </div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex justify-center bg-black min-h-screen relative">
         <div className="w-full max-w-[600px] md:border-x md:border-white/5 pb-20 md:pb-0 min-h-screen">
            
            {currentView === 'FEED' && (
              <>
                <StoriesRail stories={MOCK_STORIES} accentColor={config.accentColor} />
                <div className="mt-4">
                  {posts.map(post => (
                    <PostCard key={post.id} post={post} accentColor={config.accentColor} />
                  ))}
                  {/* End of Feed Message */}
                  <div className="py-12 text-center text-gray-500">
                    <div className="w-12 h-12 rounded-full border-2 border-white/10 flex items-center justify-center mx-auto mb-4">
                       <span className="text-2xl">✨</span>
                    </div>
                    <p className="font-serif text-lg text-gray-400">Você viu tudo por hoje.</p>
                    <p className="text-sm">Explore novos interesses para ver mais.</p>
                  </div>
                </div>
              </>
            )}

            {currentView === 'PROFILE' && (
              <Profile 
                user={CURRENT_USER} 
                posts={posts.filter(p => p.user.id === CURRENT_USER.id || p.user.id === 'me')} 
                accentColor={config.accentColor} 
              />
            )}

            {currentView === 'CREATE' && (
              <div className="h-[calc(100vh-80px)] md:h-screen">
                <CreatePost 
                  currentUser={CURRENT_USER} 
                  onPostCreated={handlePostCreated} 
                  onCancel={() => { setCurrentView('FEED'); setActiveTab('home'); }}
                  accentColor={config.accentColor}
                />
              </div>
            )}

            {currentView === 'SETTINGS' && (
               <ThemeCustomizer />
            )}

         </div>
      </main>

      {/* --- RIGHT SIDEBAR (Desktop Only) --- */}
      <aside className="hidden xl:block w-[350px] sticky top-0 h-screen p-8 pl-10">
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-3">
              <Avatar url={CURRENT_USER.avatarUrl} size="md" />
              <div className="leading-tight">
                 <div className="font-bold text-white text-sm">{CURRENT_USER.username}</div>
                 <div className="text-gray-400 text-xs">{CURRENT_USER.displayName}</div>
              </div>
           </div>
           <button className="text-xs font-semibold text-blue-400 hover:text-white" style={{ color: config.accentColor }}>Mudar</button>
        </div>

        <div className="mb-6">
           <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-400 font-semibold text-sm">Sugestões para você</h3>
              <button className="text-white text-xs font-semibold hover:opacity-80">Ver tudo</button>
           </div>
           
           <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                 <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <Avatar url={`https://picsum.photos/seed/${i + 50}/200`} size="sm" />
                       <div className="leading-tight">
                          <div className="font-bold text-white text-xs hover:underline cursor-pointer">user_suggested_{i}</div>
                          <div className="text-gray-500 text-[10px]">Seguido por neymarjr + 2</div>
                       </div>
                    </div>
                    <button className="text-xs font-semibold hover:text-white" style={{ color: config.accentColor }}>Seguir</button>
                 </div>
              ))}
           </div>
        </div>
        
        <div className="text-[11px] text-gray-600 leading-relaxed">
           Sobre • Ajuda • Imprensa • API • Carreiras • Privacidade • Termos • Localização • Idioma
           <br /><br />
           © 2024 REYMAX FROM META-VERSE
        </div>
      </aside>

      {/* --- MOBILE BOTTOM NAV (Visible on sm only) --- */}
      {currentView !== 'CREATE' && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-reymax-black/95 backdrop-blur-lg border-t border-white/10 px-6 py-3 pb-6 flex justify-between items-center">
          <MobileNavIcon name="home" icon={Home} active={activeTab === 'home'} />
          <MobileNavIcon name="search" icon={Search} active={activeTab === 'search'} />
          <MobileNavIcon name="create" icon={PlusSquare} active={activeTab === 'create'} />
          <MobileNavIcon name="settings" icon={Sparkles} active={activeTab === 'settings'} />
          <MobileNavIcon name="profile" icon={User} active={activeTab === 'profile'} />
        </nav>
      )}

    </div>
  );
};

export default App;