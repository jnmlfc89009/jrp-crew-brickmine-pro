export function Banner({ onLoginClick }: { onLoginClick?: () => void }) {
  return (
    <div className="bg-primary-container text-on-primary-container text-center py-2 px-4 text-sm font-medium font-label">
      Sign-up to Get 10 free credits
      <button
        onClick={onLoginClick}
        className="bg-primary text-on-primary px-3 py-1 rounded-full text-xs ml-2 hover:opacity-90 transition-colors inline-block mt-2 sm:mt-0 cursor-pointer"
      >
        Sign-Up
      </button>
    </div>
  );
}
