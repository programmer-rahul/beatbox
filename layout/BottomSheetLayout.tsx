import CustomText from "@/components/reusable/CustomText";
import CustomView from "@/components/reusable/CustomView";
import { COLORS } from "@/constants/COLORS";

export default function BottomSheetLayout({
  children,
  heading,
}: {
  children: React.ReactNode;
  heading: string;
}) {
  return (
    <CustomView>
      {/* header */}
      <CustomView
        style={{
          borderColor: COLORS.SECONDARY_ICON,
          borderBottomWidth: 1,
          paddingBottom: 4,
        }}
      >
        <CustomText className="text-center" fontWeight="Bold">
          {heading}
        </CustomText>
      </CustomView>

      {/* content */}
      <CustomView
        style={{
          paddingHorizontal: 20,
          paddingVertical: 12,
          marginBottom: 120,
        }}
      >
        {children}
      </CustomView>
    </CustomView>
  );
}
