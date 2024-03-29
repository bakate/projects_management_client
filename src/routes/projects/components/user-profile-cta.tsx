import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const UserProfileCta = () => (
  <Card>
    <CardHeader className="p-2 pt-0 md:p-4">
      <CardTitle>Manage your profile</CardTitle>
      <CardDescription>
        Update your profile details and password.
      </CardDescription>
    </CardHeader>
    <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
      <Button size="sm" className="w-full">
        Update Profile
      </Button>
    </CardContent>
  </Card>
);

export default UserProfileCta;
