import { Youtube, Facebook, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center sm:flex-row sm:justify-between gap-8">
        <div className="flex flex-col items-center sm:items-start gap-4">
          <img src="/logo.png" alt="JRP Crew Logo" className="h-12 w-auto" />
          <p className="text-on-surface-variant text-sm text-center sm:text-left max-w-xs">
            If you love playing with bricks, come find us on our socials!
          </p>
        </div>
        
        <div className="flex flex-col items-center sm:items-end gap-4">
          <h3 className="font-semibold text-on-surface">Connect with us</h3>
          <div className="flex items-center gap-4">
            <a href="https://www.youtube.com/@JRPCrew" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-surface-container-low hover:bg-surface-container hover:text-primary transition-colors" aria-label="Youtube">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="https://www.facebook.com/jrpcrew/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-surface-container-low hover:bg-surface-container hover:text-primary transition-colors" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://www.tiktok.com/@jrpcrew" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-surface-container-low hover:bg-surface-container hover:text-primary transition-colors" aria-label="Tiktok">
              {/* Tiktok SVG path */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5"
              >
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
            <a href="https://www.instagram.com/jrpcrew/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-surface-container-low hover:bg-surface-container hover:text-primary transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="w-full border-t border-outline/20 py-6 text-center">
        <p className="text-xs text-on-surface-variant">
          © {new Date().getFullYear()} JRP Crew. All rights reserved. Not affiliated with the LEGO Group.
        </p>
      </div>
    </footer>
  );
}
