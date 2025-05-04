
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  className?: string;
}

export default function MetricCard({ title, value, description, className = "" }: MetricCardProps) {
  return (
    <Card className={`bg-gray-900 border-gray-800 ${className}`}>
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-[#22C55E]">{value}</div>
        <p className="text-gray-400 mt-2">{description}</p>
      </CardContent>
    </Card>
  );
}
