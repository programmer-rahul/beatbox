import { checkMediaPermissions } from "@/libs/permissions";
import { useEffect, useState } from "react";

export default function useMediaPermissions() {
  const [mediaPermissions, setMediaPermissions] = useState<boolean>(false);
  const [isPermissionsChecking, setIsPermissonsChecking] =
    useState<boolean>(true);

  useEffect(() => {
    checkMediaPermissions()
      .then((status) => {
        setMediaPermissions(status);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsPermissonsChecking(false));
  }, []);

  return { mediaPermissions, isPermissionsChecking, setMediaPermissions };
}
