
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Lock, Shield, RefreshCw, Key } from "lucide-react";
import { Link } from "react-router-dom";

export default function SecuritySettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    twoFactorAuth: true,
    emailAlerts: true,
    passwordExpiry: 90,
    autoLogout: 30,
    strongPasswords: true
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSaveSettings = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Settings saved",
        description: "Your security settings have been updated",
      });
    }, 1000);
  };
  
  const handleResetAPIKey = () => {
    toast({
      title: "API Key reset",
      description: "A new API key has been generated",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/node-admin" className="mr-4">
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-green-500">Security Settings</h1>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            Authentication Settings
          </CardTitle>
          <CardDescription>
            Configure how users authenticate to the node system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="two-factor">Two-factor authentication</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Require 2FA for all administrator accounts
              </p>
            </div>
            <Switch 
              id="two-factor"
              checked={settings.twoFactorAuth}
              onCheckedChange={(checked) => setSettings({...settings, twoFactorAuth: checked})}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-alerts">Email security alerts</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Send email notifications for suspicious login attempts
              </p>
            </div>
            <Switch 
              id="email-alerts"
              checked={settings.emailAlerts}
              onCheckedChange={(checked) => setSettings({...settings, emailAlerts: checked})}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="password-expiry">Password expiry (days)</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Force password reset after this many days
              </p>
            </div>
            <Input 
              id="password-expiry"
              type="number"
              className="w-20 text-right"
              value={settings.passwordExpiry}
              onChange={(e) => setSettings({
                ...settings, 
                passwordExpiry: parseInt(e.target.value) || 0
              })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-logout">Auto logout (minutes)</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Automatically log out inactive users
              </p>
            </div>
            <Input 
              id="auto-logout"
              type="number"
              className="w-20 text-right"
              value={settings.autoLogout}
              onChange={(e) => setSettings({
                ...settings, 
                autoLogout: parseInt(e.target.value) || 0
              })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="strong-passwords">Require strong passwords</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enforce minimum complexity requirements
              </p>
            </div>
            <Switch 
              id="strong-passwords"
              checked={settings.strongPasswords}
              onCheckedChange={(checked) => setSettings({...settings, strongPasswords: checked})}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-green-500" />
            API Access
          </CardTitle>
          <CardDescription>
            Manage API keys and access credentials
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">Node API Key</Label>
            <div className="flex space-x-2">
              <Input 
                id="api-key"
                type="password" 
                value="••••••••••••••••••••••••••••••"
                readOnly
                className="font-mono"
              />
              <Button onClick={handleResetAPIKey} variant="outline" className="border-gray-300 hover:border-green-500 hover:text-green-500">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last generated: May 1, 2025
            </p>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button 
          className="bg-green-600 hover:bg-green-700" 
          onClick={handleSaveSettings}
          disabled={isLoading}
        >
          {isLoading && <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>}
          Save Security Settings
        </Button>
      </div>
    </div>
  );
}
