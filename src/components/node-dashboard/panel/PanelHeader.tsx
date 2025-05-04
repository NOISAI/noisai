
interface PanelHeaderProps {
  name: string;
  status: string;
  uptime: string;
  lastSync: string;
}

export function PanelHeader({ name, status, uptime, lastSync }: PanelHeaderProps) {
  return (
    <>
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <h4 className="font-medium text-gray-900 dark:text-white">{name}</h4>
        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
          status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 
          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        }`}>
          {status}
        </span>
      </div>
      
      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 mb-4">
        <p>Uptime: {uptime}</p>
        <p>Last sync: {lastSync}</p>
      </div>
    </>
  );
}
