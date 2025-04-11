// components/BurgerButton.tsx
interface BurgerButtonProps {
    isOpen: boolean;
    onClick: () => void;
    color?: string;
    uniformWidth?: boolean;
  }
  
  export const BurgerButton = ({
    isOpen,
    onClick,
    color = "white",
    uniformWidth = false,
  }: BurgerButtonProps) => {
    const commonClass = `absolute h-0.5 transition-all duration-300 ease-in-out`;
    const style = { backgroundColor: color };
  
    return (
      <button
        aria-label="Menú"
        className="relative w-6 h-6 flex items-center justify-center z-50"
        onClick={onClick}
      >
        <span
          className={`${commonClass} w-5 ${isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"}`}
          style={style}
        />
        <span
          className={`${commonClass} ${isOpen ? "opacity-0" : "opacity-100"} ${uniformWidth ? "w-5" : "w-3"} left-[2px]`}
          style={style}
        />
        <span
          className={`${commonClass} w-5 ${isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"}`}
          style={style}
        />
      </button>
    );
  };
  