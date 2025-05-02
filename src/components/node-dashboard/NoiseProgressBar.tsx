
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
        <span>{label}</span>
        <span>{value} dB</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`${color} h-2 rounded-full`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
