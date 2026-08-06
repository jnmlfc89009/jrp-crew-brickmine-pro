export function Banner({ onLoginClick }: { onLoginClick?: () => void }) {
  return (
    <div className="bg-primary-container text-on-primary-container text-center py-2 px-4 text-sm font-medium font-label flex flex-col sm:flex-row items-center justify-center gap-2">
      Sign-up to Get 10 free credits
      <button
        onClick={onLoginClick}
        className="bg-primary text-on-primary px-3 py-1 rounded-full text-xs hover:opacity-90 transition-colors inline-block cursor-pointer"
      >
        Sign-Up
      </button>
    </div>
  );
}
