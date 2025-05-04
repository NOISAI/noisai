
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogEntry } from "./logs/types";
import LogFilters from "./logs/LogFilters";
import LogList from "./logs/LogList";

export default function SystemLogs() {
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState({
    level: "",
    source: "",
    startDate: "",
    endDate: "",
    search: ""
  });

  // Mock log data
  const logs: LogEntry[] = [
    {
      id: "1",
      timestamp: new Date().toISOString(),
      level: "info",
      source: "system",
      message: "System started successfully"
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      level: "error",
      source: "node",
      message: "Node connection failed",
      details: "Error: Connection timeout after 30s\nNode ID: node-78245\nAttempt: 3 of 5"
    },
    {
      id: "3",
      timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
      level: "warning",
      source: "network",
      message: "Network latency increased"
    },
    {
      id: "4",
      timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
      level: "info",
      source: "user",
      message: "User logged in",
      details: "User ID: 1234\nIP: 192.168.1.1\nBrowser: Chrome 98.0.4758.102"
    },
    {
      id: "5",
      timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
      level: "debug",
      source: "system",
      message: "Cache cleared"
    }
  ];
  
  // Filter logs by tab
  const getFilteredLogs = () => {
    if (activeTab === "all") return logs;
    if (activeTab === "errors") return logs.filter(log => log.level === "error");
    if (activeTab === "warnings") return logs.filter(log => log.level === "warning");
    if (activeTab === "system") return logs.filter(log => log.source === "system");
    if (activeTab === "nodes") return logs.filter(log => log.source === "node");
    return logs;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">System Logs</h2>
          <p className="text-gray-400">View and analyze system activity logs</p>
        </div>
        <Link to="/node-admin">
          <Button variant="outline" size="sm" className="bg-gray-900 border-gray-700 hover:bg-gray-800">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
      
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-gray-800">
                <TabsTrigger value="all">All Logs</TabsTrigger>
                <TabsTrigger value="errors">Errors</TabsTrigger>
                <TabsTrigger value="warnings">Warnings</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
                <TabsTrigger value="nodes">Nodes</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LogFilters 
            filters={filters}
            onFilterChange={setFilters}
          />
          <LogList 
            logs={getFilteredLogs()}
            filters={filters}
          />
        </CardContent>
      </Card>
    </div>
  );
}
