import {
  checkMediaPermissions,
  requestMediaPermissions,
} from "@/libs/permissions";
import { Button } from "react-native";
import CustomView from "./reusable/CustomView";
import CustomText from "./reusable/CustomText";
import { useEffect } from "react";

const PermissionsRequired = ({
  setMediaPermissions,
}: {
  setMediaPermissions: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleRequestPermissions = async () => {
    try {
      await requestMediaPermissions();
      // Re-check permissions after requesting
      const status = await checkMediaPermissions();
      setMediaPermissions(status);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    requestMediaPermissions().then((granted) => setMediaPermissions(granted));
  }, []);

  return (
    <CustomView
      className="flex flex-1 items-center justify-center gap-4 p-4"
      backgroundColor="PRIMARY_BG"
    >
      <CustomText
        className="text-2xl"
        color="PRIMARY_TEXT"
        fontWeight="Semibold"
      >
        Permissions Required
      </CustomText>
      <CustomText
        className="text-center text-xl"
        color="SECONDARY_TEXT"
        fontWeight="Medium"
      >
        We need access to your media library to display your Music files.
      </CustomText>
      <Button title="Grant Permissions" onPress={handleRequestPermissions} />
    </CustomView>
  );
};
export default PermissionsRequired;
