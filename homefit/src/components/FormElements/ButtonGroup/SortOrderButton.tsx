import React from 'react';

interface SortOrderButtonProps {
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
}

const SortOrderButton: React.FC<SortOrderButtonProps> = ({ sortOrder, setSortOrder }) => {
  return (
    <button 
      className="px-4 py-2 bg-blue-500 text-white rounded"
      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
    >
      {sortOrder === 'asc' ? '오름차순' : '내림차순'}
    </button>
  );
};

export default SortOrderButton;