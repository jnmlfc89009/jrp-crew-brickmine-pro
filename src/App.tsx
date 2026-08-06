import { useState } from 'react';
import { Banner } from './components/Banner';
import { Header } from './components/Header';
import { ToolInterface } from './components/ToolInterface';
import { SampleImage } from './components/SampleImage';
import { LoginModal } from './components/LoginModal';
import { SettingsModal } from './components/SettingsModal';
import { Footer } from './components/Footer';

export default function App() {
  const [generatedImage, setGeneratedImage] = useState<string>('');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-body bg-background text-on-background">
      <Banner onLoginClick={() => setIsLoginOpen(true)} />
      <Header onLoginClick={() => setIsLoginOpen(true)} onSettingsClick={() => setIsSettingsOpen(true)} />
      <main className="flex-grow flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full gap-16">
        <section className="w-full text-center space-y-6 mt-4">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-on-surface font-headline tracking-tight">
            <span className="text-tertiary">Photo</span> to <span className="text-secondary bg-clip-text text-transparent bg-gradient-to-br from-secondary to-tertiary">Lego</span>
            <br />
            <span className="text-2xl md:text-4xl font-semibold mt-3 block text-on-surface-variant">Turn Any Photo into Lego Art</span>
          </h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg leading-relaxed mt-6">
            Easy, free, and fun. JRP Crew - Brickmine turns your selfies, portraits, pets, or landscapes into vibrant, pixelated Lego artworks in seconds. Upload your picture and discover the joy of creating Lego art online!
          </p>
          
          <ToolInterface onImageGenerated={setGeneratedImage} />
        </section>
        
        <SampleImage src={generatedImage} />
      </main>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <Footer />
    </div>
  );
}
