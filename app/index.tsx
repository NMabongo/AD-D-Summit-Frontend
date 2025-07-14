import { React } from "react";
import { View } from "react-native";
import WelcomePage from "./welcome/welcomePage";


export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <WelcomePage />
    </View>
  );
}