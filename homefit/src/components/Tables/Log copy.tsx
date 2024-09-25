// 'use client';

// import { useState, useEffect } from 'react';
// import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";

// interface LogEntry {
//   timestamp: string;
//   level: string;
//   message: string;
// }

// const LogComponent = () => {
//   const [logs, setLogs] = useState<LogEntry[]>([]);
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
//   const [levelFilter, setLevelFilter] = useState<string>('');
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchLogs();
//   }, [sortOrder, levelFilter]);

//   const fetchLogs = async () => {
//     try {
//       setError(null);
//       const response = await fetch(
//         `/api/logs?sortOrder=${sortOrder}&logLevel=${levelFilter}`,
//         {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
//           },
//         }
//       );
//       if (response.ok) {
//         const data = await response.json();
//         setLogs(data.logs || []);
//       } else {
//         const errorData = await response.json();
//         setError(errorData.error || 'Failed to fetch logs');
//       }
//     } catch (error) {
//       console.error('Error fetching logs:', error);
//       setError('An error occurred while fetching logs');
//     }
//   };

//   const getLogLevelColor = (level: string) => {
//     switch (level) {
//       case 'INFO':
//         return 'bg-[#219653]/[0.08] text-[#219653]';
//       case 'WARN':
//         return 'bg-[#FFA70B]/[0.08] text-[#FFA70B]';
//       case 'ERROR':
//         return 'bg-[#D34053]/[0.08] text-[#D34053]';
//       default:
//         return 'bg-gray-200 text-gray-800';
//     }
//   };

//   return (
//     <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
//       <div className="max-w-full overflow-x-auto">
//         <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
//           시간순 정렬: {sortOrder === 'asc' ? '오름차순' : '내림차순'}
//         </button>
//         {error && <div className="error">{error}</div>}
//         <select onChange={(e) => setLevelFilter(e.target.value)} value={levelFilter}>
//           <option value="">모든 레벨</option>
//           <option value="INFO">INFO</option>
//           <option value="WARN">WARN</option>
//           <option value="ERROR">ERROR</option>
//         </select>
//       </div>
//       <table className="w-full table-auto">
//         <thead>
//           <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
//             <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">타임스탬프</th>
//             <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">로그 레벨</th>
//             <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">로그 본문</th>
//           </tr>
//         </thead>
//         <tbody>
//           {logs.map((log, index) => (
//             <tr key={index}>
//               <td>{log.timestamp}</td>
//               <td>{log.level}</td>
//               <td>{log.message}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default LogComponent;