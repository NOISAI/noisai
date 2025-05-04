
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LogFilters from "./logs/LogFilters";
import LogList from "./logs/LogList";
import { LogEntry, LogFilterLevel, LogFilterService, LogService } from "./logs/types";

// Mock log data
const mockLogs = [
  { id: 1, timestamp: "2025-05-03T23:15:12Z", level: "info", message: "Node synchronization completed successfully", service: "sync" },
  { id: 2, timestamp: "2025-05-03T23:10:05Z", level: "warning", message: "High memory usage detected (85%)", service: "system" },
  { id: 3, timestamp: "2025-05-03T23:05:47Z", level: "error", message: "Failed to connect to peer node at 192.168.1.105", service: "network" },
  { id: 4, timestamp: "2025-05-03T23:01:30Z", level: "info", message: "User authentication successful: admin@example.com", service: "auth" },
  { id: 5, timestamp: "2025-05-03T22:58:22Z", level: "info", message: "Processed 152 transactions in batch #28940", service: "transaction" },
  { id: 6, timestamp: "2025-05-03T22:55:18Z", level: "warning", message: "Connection timeout with external API", service: "api" },
  { id: 7, timestamp: "2025-05-03T22:50:03Z", level: "error", message: "Database query failed: relation \"metrics\" does not exist", service: "database" },
  { id: 8, timestamp: "2025-05-03T22:45:56Z", level: "info", message: "System backup completed", service: "backup" },
  { id: 9, timestamp: "2025-05-03T22:40:42Z", level: "info", message: "New user account created: user123", service: "auth" },
  { id: 10, timestamp: "2025-05-03T22:35:29Z", level: "error", message: "Storage quota exceeded for logs", service: "system" },
  { id: 11, timestamp: "2025-05-03T22:30:15Z", level: "info", message: "Node started with protocol version 2.4.1", service: "system" },
  { id: 12, timestamp: "2025-05-03T22:25:03Z", level: "warning", message: "SSL certificate will expire in 7 days", service: "security" },
] as LogEntry[];

export default function SystemLogs() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<LogEntry[]>(mockLogs);
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>(mockLogs);
  const [filterLevel, setFilterLevel] = useState<LogFilterLevel>("all");
  const [filterService, setFilterService] = useState<LogFilterService>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Apply filters when they change
  useEffect(() => {
    let results = logs;
    
    if (filterLevel !== "all") {
      results = results.filter(log => log.level === filterLevel);
    }
    
    if (filterService !== "all") {
      results = results.filter(log => log.service === filterService);
    }
    
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      results = results.filter(log => 
        log.message.toLowerCase().includes(query) || 
        log.service.toLowerCase().includes(query)
      );
    }
    
    setFilteredLogs(results);
  }, [logs, filterLevel, filterService, searchQuery]);
  
  const refreshLogs = () => {
    setIsRefreshing(true);
    // In a real app, this would fetch from an API
    setTimeout(() => {
      // Add a new log at the top
      const newLog = {
        id: logs.length + 1,
        timestamp: new Date().toISOString(),
        level: ["info", "warning", "error"][Math.floor(Math.random() * 3)] as "info" | "warning" | "error",
        message: `Log refresh triggered manually at ${new Date().toLocaleTimeString()}`,
        service: "system" as LogService
      };
      setLogs([newLog, ...logs]);
      setIsRefreshing(false);
    }, 800);
  };
  
  const downloadLogs = () => {
    // In a real app, this would generate a proper log file
    const logText = filteredLogs
      .map(log => `[${log.timestamp}] [${log.level.toUpperCase()}] [${log.service}] ${log.message}`)
      .join('\n');
    
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `node-logs-${new Date().toISOString().split('T')[0]}.log`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center mb-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="mr-2 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
              onClick={() => navigate("/node-admin")}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Admin
            </Button>
          </div>
          <h2 className="text-2xl font-bold text-white">System Logs</h2>
          <p className="text-gray-400">View system activity and event logs</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
            onClick={refreshLogs}
            disabled={isRefreshing}
          >
            <RefreshCcw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
            onClick={downloadLogs}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <LogFilters 
        searchQuery={searchQuery}
        filterLevel={filterLevel}
        filterService={filterService}
        onSearchChange={setSearchQuery}
        onLevelChange={setFilterLevel}
        onServiceChange={setFilterService}
      />

      <LogList logs={filteredLogs} />
    </div>
  );
}
