import { COLORS } from "@/constants/COLORS";
import { StyleProp, Text, TextStyle } from "react-native";

const fontMapping = {
  Regular: "Montserrat_400Regular",
  Medium: "Montserrat_500Medium",
  Semibold: "Montserrat_600SemiBold",
  Bold: "Montserrat_700Bold",
};

interface TCustomText {
  children: React.ReactNode;
  className?: string | undefined;
  color?: keyof typeof COLORS;
  colorOpacity?: `${string}${string}`;
  style?: StyleProp<TextStyle>;
  fontWeight?: "Regular" | "Medium" | "Semibold" | "Bold";
  numberOfLines?: number;
}

export default function CustomText({
  children,
  className,
  color,
  colorOpacity = "ff",
  style,
  fontWeight = "Regular",
  numberOfLines,
}: TCustomText) {
  return (
    <Text
      style={[
        {
          color: color ? COLORS[color] + colorOpacity : COLORS.PRIMARY_TEXT,
          fontFamily: fontMapping[fontWeight],
        },
        style,
      ]}
      className={className}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}
