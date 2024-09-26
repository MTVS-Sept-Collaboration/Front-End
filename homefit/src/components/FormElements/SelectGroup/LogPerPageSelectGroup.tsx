import React from 'react';

interface LogsPerPageSelectProps {
  logsPerPage: number;
  setLogsPerPage: (count: number) => void;
}

const selectGroupStyle = "px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600";

const SelectGroupWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative inline-block text-left">
    {children}
  </div>
);

const LogsPerPageSelectGroup: React.FC<LogsPerPageSelectProps> = ({ logsPerPage, setLogsPerPage }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLogsPerPage(Number(e.target.value));
  };

  return (
    <SelectGroupWrapper>
      <select 
        className={selectGroupStyle}
        onChange={handleChange}
        value={logsPerPage}
      >
        <option value={5}>5개씩 보기</option>
        <option value={10}>10개씩 보기</option>
        <option value={20}>20개씩 보기</option>
        <option value={50}>50개씩 보기</option>
      </select>
    </SelectGroupWrapper>
  );
};

export default LogsPerPageSelectGroup;