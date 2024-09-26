'use client';

import React, { useState, useEffect, useCallback } from 'react';
import LogLevelSelectGroup from '@/components/FormElements/SelectGroup/LogLevelSelectGroup';
import LoggerSelectGroup from '@/components/FormElements/SelectGroup/LoggerSelectGroup';
import SortOrderSelectGroup from '@/components/FormElements/SelectGroup/SortOrderSelectGroup';
import LogsPerPageSelectGroup from '@/components/FormElements/SelectGroup/LogPerPageSelectGroup';

interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  shortLogger: string;
}

interface LogResponse {
  logs: LogEntry[];
  currentPage: number;
  totalPages: number;
  totalLogs: number;
}

const LogComponent: React.FC = () => {
  const [logData, setLogData] = useState<LogResponse | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [levelFilter, setLevelFilter] = useState<string>('');
  const [loggerFilter, setLoggerFilter] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage, setLogsPerPage] = useState(20);
  const [uniqueLoggers, setUniqueLoggers] = useState<string[]>([]);

  const updateUniqueLoggers = useCallback((logs: LogEntry[]) => {
    const loggerSet = new Set(logs.map(log => log.shortLogger));
    const loggers = Array.from(loggerSet);
    setUniqueLoggers(loggers);
  }, []);

  const fetchLogs = useCallback(async () => {
    try {
      setError(null);
      const url = `/api/logs?page=${currentPage}&limit=${logsPerPage}&sortOrder=${sortOrder}&logLevel=${levelFilter}`;
      // console.log('Fetching logs with URL:', url);
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      });
      if (response.ok) {
        const data: LogResponse = await response.json();
        // console.log('Fetched data:', data);
        
        // 로거 필터링을 클라이언트 측에서 수행
        const filteredLogs = loggerFilter && loggerFilter !== '모든 로거'
          ? data.logs.filter(log => 
            log.shortLogger.toLowerCase().includes(loggerFilter.toLowerCase()))
          : data.logs;
        
        setLogData({
          ...data,
          logs: filteredLogs
        });
        updateUniqueLoggers(data.logs);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch logs');
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
      setError('An error occurred while fetching logs');
    }
  }, [currentPage, logsPerPage, sortOrder, levelFilter, loggerFilter]);

  useEffect(() => {
    fetchLogs();
    const intervalId = setInterval(fetchLogs, 10000); // 10초마다 업데이트(새로고침 X)
    return () => clearInterval(intervalId);
  }, [fetchLogs]);

  const getLogLevelColor = (level: string) => {
    switch (level.toUpperCase()) {
      case 'INFO': return 'bg-[#219653]/[0.08] text-[#219653]';
      case 'WARN': return 'bg-[#FFA70B]/[0.08] text-[#FFA70B]';
      case 'ERROR': return 'bg-[#D34053]/[0.08] text-[#D34053]';
      case 'DEBUG': return 'bg-[#4A90E2]/[0.08] text-[#4A90E2]';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp: string): string => {
    return timestamp.split(' ')[0] || timestamp;
  };

  const getLogMessage = (message: string): string => {
    const parts = message.split(' - ');
    return parts.length > 1 ? parts[1] : message;
  };

  const getLogLevel = (log: LogEntry): string => {

    return log.level;
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleLogsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLogsPerPage = Number(e.target.value);
    // console.log('Changing logs per page to:', newLogsPerPage);
    setLogsPerPage(newLogsPerPage);
    setCurrentPage(1);
  };

  const renderPagination = () => {
    if (!logData) return null;

    const { currentPage, totalPages } = logData;

    let pages: (number | string)[] = [];
    if (totalPages <= 7) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, 5, '...', totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
      }
    }

    return (
      <nav>
        <ul className="flex flex-wrap items-center">
          <li>
            <a
              className={`flex h-8 w-8 items-center justify-center rounded-[3px] ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-primary hover:text-white'}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) {
                  handlePageChange(currentPage - 1);
                }
              }}
            >
              <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.1758 16.1158C12.007 16.1158 11.8383 16.0596 11.7258 15.9189L5.36953 9.45019C5.11641 9.19707 5.11641 8.80332 5.36953 8.5502L11.7258 2.08145C11.9789 1.82832 12.3727 1.82832 12.6258 2.08145C12.8789 2.33457 12.8789 2.72832 12.6258 2.98145L6.71953 9.0002L12.6539 15.0189C12.907 15.2721 12.907 15.6658 12.6539 15.9189C12.4852 16.0314 12.3445 16.1158 12.1758 16.1158Z" fill=""></path>
              </svg>
            </a>
          </li>
          {pages.map((page, index) => (
            <li key={index}>
              {page === '...' ? (
                <span className="flex items-center justify-center rounded-[3px] px-3 py-1.5 font-medium">...</span>
              ) : (
                <a
                  className={`flex items-center justify-center rounded-[3px] px-3 py-1.5 font-medium ${logData.currentPage === page ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white'}`}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page as number);
                  }}
                >
                  {page}
                </a>
              )}
            </li>
          ))}
          <li>
            <a
              className={`flex h-8 w-8 items-center justify-center rounded-[3px] ${currentPage === logData.totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-primary hover:text-white'}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < logData.totalPages) {
                  handlePageChange(currentPage + 1);
                }
              }}
            >
              <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.81953 16.1158C5.65078 16.1158 5.51016 16.0596 5.36953 15.9471C5.11641 15.6939 5.11641 15.3002 5.36953 15.0471L11.2758 9.0002L5.36953 2.98145C5.11641 2.72832 5.11641 2.33457 5.36953 2.08145C5.62266 1.82832 6.01641 1.82832 6.26953 2.08145L12.6258 8.5502C12.8789 8.80332 12.8789 9.19707 12.6258 9.45019L6.26953 15.9189C6.15703 16.0314 5.98828 16.1158 5.81953 16.1158Z" fill=""></path>
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div className="flex flex-wrap gap-4 mb-4">
        <SortOrderSelectGroup sortOrder={sortOrder} setSortOrder={setSortOrder} />
        <LogLevelSelectGroup levelFilter={levelFilter} setLevelFilter={setLevelFilter} />
        <LoggerSelectGroup loggerFilter={loggerFilter} setLoggerFilter={setLoggerFilter} uniqueLoggers={uniqueLoggers} />
        <LogsPerPageSelectGroup logsPerPage={logsPerPage} setLogsPerPage={setLogsPerPage} />
      </div>

      {error && <div className="error text-red-500 mt-2">{error}</div>}

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
              <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">타임스탬프</th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">로그 레벨</th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">로거</th>
              <th className="min-w-[300px] px-4 py-4 font-medium text-dark dark:text-white">로그 본문</th>
            </tr>
          </thead>
          <tbody>
            {logData?.logs.map((log, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : ''}>
                <td className="px-4 py-4 xl:pl-7.5">{formatTimestamp(log.timestamp)}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full px-3.5 py-1 text-body-sm font-medium ${getLogLevelColor(getLogLevel(log))}`}>
                    {getLogLevel(log)}
                  </span>
                </td>
                <td className="px-4 py-4 break-all">{log.shortLogger}</td>
                <td className="px-4 py-4 break-words">{getLogMessage(log.message)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {logData && logData.logs.length === 0 && (
        <div className="text-center py-4">표시할 로그가 없습니다.</div>
      )}

      <div className="flex justify-center mt-4">
        {renderPagination()}
      </div>

      {logData && (
        <div className="text-sm text-gray-500 mt-2">
          총 {logData.totalLogs}개의 로그 중 {(logData.currentPage - 1) * logsPerPage + 1}-
          {Math.min(logData.currentPage * logsPerPage, logData.totalLogs)}개 표시
        </div>
      )}
    </div>
  );
};

export default LogComponent;