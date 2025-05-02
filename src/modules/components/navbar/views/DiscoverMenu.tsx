import { ChevronRight } from "react-feather";

interface DiscoverMenuProps {
  onSelectView: (view: string) => void;
  currentView: string | null;
}

const DiscoverMenu: React.FC<DiscoverMenuProps> = ({ onSelectView, currentView }) => {
  return (
    <div className="col-span-1 border-r divide-y overflow-auto bg-white h-fit rounded-b-2xl">
      <button
        className="flex justify-between items-center gap-2 text-gray-800 px-4 py-3 hover:bg-gray-100 font-medium w-full"
        onClick={() => onSelectView("specialty")}
      >
        <span>Especialidades</span>
        <ChevronRight size={20} />
      </button>

      <button
        className="flex justify-between items-center gap-2 text-gray-800 px-4 py-3 hover:bg-gray-100 font-medium w-full"
        onClick={() => onSelectView("offer")}
      >
        <span>Qué ofrecemos</span>
        <ChevronRight size={20} />
      </button>

      <button
        className="flex justify-between items-center gap-2 text-gray-800 px-4 py-3 hover:bg-gray-100 font-medium w-full"
        onClick={() => onSelectView("resources")}
      >
        <span>Recursos</span>
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default DiscoverMenu;
