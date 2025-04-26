"use client";

interface PlayPauseButtonProps {
  paused: boolean;
  onToggle: () => void;
}

const PlayPauseButton = ({ paused, onToggle }: PlayPauseButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className="hidden md:flex absolute bottom-[110px] right-10 md:right-16 lg:right-20 z-30 bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white p-2 md:p-3 lg:p-4 rounded-full transition-all duration-300 ease-in-out"
      style={{
        background: '#FFFFFF1A',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)', // <- Para Safari también
      }}
    >
      {paused ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-2 w-2 md:h-3 md:w-3 lg:h-5 lg:w-5 transition-all"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-5.197-3.027A1 1 0 008 9.027v5.946a1 1 0 001.555.832l5.197-3.027a1 1 0 000-1.664z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-2 w-2 md:h-3 md:w-3 lg:h-5 lg:w-5 transition-all"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
        </svg>
      )}
    </button>
  );
};

export default PlayPauseButton;
