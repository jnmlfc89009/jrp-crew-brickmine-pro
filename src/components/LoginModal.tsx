import { X } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-surface p-8 rounded-3xl shadow-xl border border-outline-variant">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold font-headline text-on-surface mb-2">Welcome Back</h2>
          <p className="text-on-surface-variant text-sm">Log in to save your Brick artworks and increase your generation limit.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-on-surface mb-1">Email</label>
            <input 
              type="email" 
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-on-surface mb-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          
          <button className="w-full py-3 px-4 bg-primary text-on-primary font-bold rounded-xl hover:opacity-95 transition-opacity shadow-md">
            Log In
          </button>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-surface text-on-surface-variant">Or continue with</span>
            </div>
          </div>
          
          <button className="w-full py-3 px-4 bg-surface-container border border-outline-variant text-on-surface font-medium rounded-xl hover:bg-surface-variant transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </button>
        </div>
        
        <p className="mt-6 text-center text-sm text-on-surface-variant">
          Don't have an account? <a href="#" className="text-primary hover:underline font-medium">Sign up</a>
        </p>
      </div>
    </div>
  );
}
