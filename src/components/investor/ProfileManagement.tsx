
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProfileManagement = () => {
  return (
    <Card className="bg-gray-900 border border-gray-800">
      <CardHeader>
        <CardTitle>Investor Profile</CardTitle>
        <CardDescription>Manage your personal information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-400">Full Name</Label>
            <Input 
              id="name" 
              defaultValue="John Doe" 
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-400">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              defaultValue="john.doe@example.com" 
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="investorType" className="text-gray-400">Investor Type</Label>
            <select 
              id="investorType" 
              defaultValue="individual"
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
            >
              <option value="individual">Individual</option>
              <option value="entity">Entity/Company</option>
              <option value="fund">Investment Fund</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="taxId" className="text-gray-400">Tax ID / SSN</Label>
            <Input 
              id="taxId" 
              defaultValue="XXX-XX-1234" 
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          
          <Button 
            className="w-full bg-[#22C55E] hover:bg-[#22C55E]/90 text-black"
          >
            Update Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileManagement;
