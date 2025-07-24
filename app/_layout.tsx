import { toastConfig } from '@/components/toastConfig';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';

import { AuthProvider } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { createContext, useState } from 'react';

export const ResetSignalContext = createContext<{
  resetSignal: number;
  triggerReset: () => void;
}>({
  resetSignal: 0,
  triggerReset: () => {},
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [resetSignal, setResetSignal] = useState(0);
  const triggerReset = () => setResetSignal((prev) => prev + 1);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ResetSignalContext.Provider value={{ resetSignal, triggerReset }}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </ResetSignalContext.Provider>    
      <Toast config={toastConfig}  bottomOffset={70}/>
    </AuthProvider>
  );
}
