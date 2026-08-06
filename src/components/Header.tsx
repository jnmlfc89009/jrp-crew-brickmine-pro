import { Menu } from 'lucide-react';

interface HeaderProps {
  onLoginClick?: () => void;
  onSettingsClick?: () => void;
}

export function Header({ onLoginClick, onSettingsClick }: HeaderProps) {
  return (
    <header className="bg-surface sticky top-0 z-50 border-b border-outline-variant py-3 px-4 sm:px-6 flex justify-between items-center custom-shadow">
      <div className="flex items-center gap-2 sm:gap-4">
        <img src="/logo.png" alt="JRP Crew Logo" className="w-10 h-10 sm:w-14 sm:h-14 object-contain" />
        <span className="font-bold text-lg sm:text-2xl text-on-surface font-headline tracking-tight">JRP Crew - Brickmine</span>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button 
          onClick={onLoginClick}
          className="text-sm font-medium text-on-surface hover:text-primary transition-colors font-label cursor-pointer"
        >
          Log In
        </button>
        <button 
          onClick={onSettingsClick}
          className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
