import { X, Moon, Sun, Monitor, Image as ImageIcon, History, CreditCard, ChevronRight } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-surface p-6 sm:p-8 rounded-3xl shadow-xl border border-outline-variant max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-2xl font-bold font-headline text-on-surface mb-6">Settings</h2>
        
        <div className="space-y-6">
          {/* Account Section - Suggestion */}
          <section>
            <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-3">Account</h3>
            <div className="bg-surface-container rounded-2xl overflow-hidden border border-outline-variant divide-y divide-outline-variant">
              <button className="w-full flex items-center justify-between p-4 hover:bg-surface-variant transition-colors text-left">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
                    <History className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-on-surface">Generation History</p>
                    <p className="text-xs text-on-surface-variant">View your previous artworks</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-on-surface-variant" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-surface-variant transition-colors text-left">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-on-surface">Pro Subscription</p>
                    <p className="text-xs text-on-surface-variant">Upgrade for unlimited generations</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-on-surface-variant" />
              </button>
            </div>
          </section>

          {/* Preferences Section - Suggestion */}
          <section>
            <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-3">Preferences</h3>
            <div className="bg-surface-container rounded-2xl p-4 border border-outline-variant space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-on-surface">Theme</p>
                  <p className="text-xs text-on-surface-variant">Choose your visual aesthetic</p>
                </div>
                <div className="flex bg-surface-variant p-1 rounded-xl">
                  <button className="p-2 rounded-lg bg-surface shadow-sm text-on-surface">
                    <Sun className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface">
                    <Moon className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface">
                    <Monitor className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="h-px bg-outline-variant w-full" />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-on-surface">Default Style</p>
                  <p className="text-xs text-on-surface-variant">Starting style for new generations</p>
                </div>
                <select className="bg-surface border border-outline-variant text-on-surface text-sm rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Lego</option>
                  <option>Ghibli</option>
                  <option>3D Render</option>
                  <option>Claymation</option>
                </select>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
