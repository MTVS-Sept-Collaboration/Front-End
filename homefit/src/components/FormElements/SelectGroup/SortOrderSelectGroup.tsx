import React from 'react';

interface SortOrderSelectGroupProps {
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
}

const selectGroupStyle = "px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600";

const SelectGroupWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative inline-block text-left">
    {children}
  </div>
);

const SortOrderSelectGroup: React.FC<SortOrderSelectGroupProps> = ({ sortOrder, setSortOrder }) => {
  return (
    <SelectGroupWrapper>
      <select 
        className={selectGroupStyle}
        onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
        value={sortOrder}
      >
        <option value="asc">오름차순</option>
        <option value="desc">내림차순</option>
      </select>
    </SelectGroupWrapper>
  );
};

export default SortOrderSelectGroup;