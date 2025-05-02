import DropdownContent from "../DropdownContent";

interface DiscoverContentProps {
  currentView: string | null;
  selectedCategory: string | null;
  setCurrentView: (view: string | null) => void;
  setSelectedCategory: (category: string | null) => void;
}

const DiscoverContent: React.FC<DiscoverContentProps> = ({
  currentView,
  selectedCategory,
  setCurrentView,
  setSelectedCategory
}) => {
  return (
    <div className="col-span-2 overflow-auto">
      {currentView ? (
        <DropdownContent
          currentView={currentView}
          selectedCategory={selectedCategory}
          setCurrentView={setCurrentView}
          setSelectedCategory={setSelectedCategory}
          isMobile={false}
        />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400"></div>
      )}
    </div>
  );
};

export default DiscoverContent;
