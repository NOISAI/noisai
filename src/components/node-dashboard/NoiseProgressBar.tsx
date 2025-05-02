
interface NoiseProgressBarProps {
  label: string;
  value: number;
  max: number;
  color: string;
}

export function NoiseProgressBar({ label, value, max, color }: NoiseProgressBarProps) {
  const percentage = (value / max) * 100;
  
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600 dark:text-gray-300">{label}</span>
        <span className="text-gray-800 dark:text-gray-200 font-medium">{value} dB</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          className={`${color} h-2 rounded-full`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
