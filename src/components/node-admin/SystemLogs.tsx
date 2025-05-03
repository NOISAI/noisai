
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, RefreshCcw, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

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
];

export default function SystemLogs() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState(mockLogs);
  const [filteredLogs, setFilteredLogs] = useState(mockLogs);
  const [filterLevel, setFilterLevel] = useState<string>("all");
  const [filterService, setFilterService] = useState<string>("all");
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
        level: ["info", "warning", "error"][Math.floor(Math.random() * 3)],
        message: `Log refresh triggered manually at ${new Date().toLocaleTimeString()}`,
        service: "system"
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
  
  const formatLogTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };
  
  const formatLogDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString();
  };
  
  const getLevelColor = (level: string) => {
    switch(level) {
      case "error":
        return "bg-red-500 hover:bg-red-600";
      case "warning":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "info":
        return "bg-blue-500 hover:bg-blue-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search logs..."
            className="pl-10 bg-gray-800 border-gray-700 text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Select value={filterLevel} onValueChange={setFilterLevel}>
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Filter by level" />
          </SelectTrigger>
          <SelectContent className="bg-[#1A1F2C] border-gray-700 text-white">
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="info">Info</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={filterService} onValueChange={setFilterService}>
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Filter by service" />
          </SelectTrigger>
          <SelectContent className="bg-[#1A1F2C] border-gray-700 text-white">
            <SelectItem value="all">All Services</SelectItem>
            <SelectItem value="system">System</SelectItem>
            <SelectItem value="auth">Authentication</SelectItem>
            <SelectItem value="network">Network</SelectItem>
            <SelectItem value="database">Database</SelectItem>
            <SelectItem value="sync">Synchronization</SelectItem>
            <SelectItem value="transaction">Transactions</SelectItem>
            <SelectItem value="api">API</SelectItem>
            <SelectItem value="security">Security</SelectItem>
            <SelectItem value="backup">Backup</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="border-b border-gray-800">
          <CardTitle className="text-white">Log Events</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-800">
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <div key={log.id} className="p-4 hover:bg-gray-800/50">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="flex items-center mb-2 md:mb-0">
                      <Badge className={getLevelColor(log.level)}>
                        {log.level.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="ml-2 border-gray-700 text-gray-300">
                        {log.service}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-400">
                      {formatLogDate(log.timestamp)} at {formatLogTime(log.timestamp)}
                    </div>
                  </div>
                  <p className="mt-2 text-white font-mono text-sm leading-relaxed">{log.message}</p>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-400">
                No logs found matching your filters
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

