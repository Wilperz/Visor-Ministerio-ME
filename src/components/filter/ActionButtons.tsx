import { Search, XCircle } from 'lucide-react';

interface ActionButtonsProps {
  onSearch: () => void;
  onClear: () => void;
  disabled: boolean;
}

export function ActionButtons({ onSearch, onClear, disabled }: ActionButtonsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onSearch}
        disabled={disabled}
        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <Search size={18} />
        <span>Buscar</span>
      </button>
      
      <button
        onClick={onClear}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <XCircle size={18} />
        <span>Limpiar</span>
      </button>
    </div>
  );
}