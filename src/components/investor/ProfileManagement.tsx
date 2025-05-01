
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProfileLoader from "@/components/investor/profile/ProfileLoader";

const ProfileManagement = () => {
  return (
    <Card className="bg-gray-900 border border-gray-800">
      <CardHeader>
        <CardTitle>Investor Profile</CardTitle>
        <CardDescription>Manage your personal information</CardDescription>
      </CardHeader>
      <CardContent>
        <ProfileLoader />
      </CardContent>
    </Card>
  );
};

export default ProfileManagement;
