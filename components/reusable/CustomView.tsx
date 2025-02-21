import { COLORS } from "@/constants/COLORS";
import { StyleProp, View, ViewStyle } from "react-native";

interface TCustomView {
  children?: React.ReactNode;
  className?: string | undefined;
  backgroundColor?: keyof typeof COLORS;
  backgroundColorOpacity?: `${string}${string}`;
  style?: StyleProp<ViewStyle>;
}

export default function CustomView({
  children,
  className,
  backgroundColor,
  style,
  backgroundColorOpacity = "ff",
}: TCustomView) {
  return (
    <View
      style={[
        {
          backgroundColor: backgroundColor
            ? COLORS[backgroundColor] + backgroundColorOpacity
            : "transparent",
        },
        style,
      ]}
      className={className}
    >
      {children}
    </View>
  );
}
