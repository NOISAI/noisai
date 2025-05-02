
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  status?: string;
  statusColor?: string;
  trend?: string;
  trendDirection?: "up" | "down";
  icon?: LucideIcon;
  iconBackground?: string;
  iconColor?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  status,
  statusColor = "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
  trend,
  trendDirection = "up",
  icon: Icon,
  iconBackground = "bg-green-50 dark:bg-green-900/30",
  iconColor = "text-green-600 dark:text-green-400"
}: StatsCardProps) {
  return (
    <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden card-enhanced">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-300 flex items-center">
              {title}
              <span className="inline-block w-4 h-4 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-300 text-xs flex items-center justify-center ml-1">?</span>
            </p>
            <h2 className="text-4xl font-bold mt-2 text-gray-900 dark:text-white">{value}</h2>
            {status && (
              <div className={`mt-1 inline-block px-2 py-0.5 ${statusColor} text-xs rounded-full`}>
                {status}
              </div>
            )}
            {subtitle && <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">{subtitle}</p>}
            {trend && (
              <p className={`text-sm ${trendDirection === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"} mt-1`}>
                {trendDirection === "up" ? "↑" : "↓"} {trend}
              </p>
            )}
          </div>
          {Icon && (
            <div className={`${iconBackground} p-2 rounded-lg`}>
              <Icon className={`h-6 w-6 ${iconColor}`} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
