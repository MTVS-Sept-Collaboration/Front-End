import React from 'react';

interface LoggerSelectGroupProps {
  loggerFilter: string;
  setLoggerFilter: (logger: string) => void;
  uniqueLoggers: string[];
}

const selectGroupStyle = "px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600";

const SelectGroupWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative inline-block text-left">
    {children}
  </div>
);

const LoggerSelectGroup: React.FC<LoggerSelectGroupProps> = ({ loggerFilter, setLoggerFilter, uniqueLoggers }) => {
  return (
    <SelectGroupWrapper>
      <select 
        className={selectGroupStyle}
        onChange={(e) => setLoggerFilter(e.target.value)} 
        value={loggerFilter}
      >
        <option value="">모든 로거</option>
        {uniqueLoggers.map(logger => (
          <option key={logger} value={logger}>{logger}</option>
        ))}
      </select>
    </SelectGroupWrapper>
  );
};

export default LoggerSelectGroup;