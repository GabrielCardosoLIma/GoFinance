import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import * as SplashScreen from 'expo-splash-screen';
import theme from './src/global/Styles/theme';
import { Dashboard } from './src/screens/Dashboard';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';
import { Register } from './src/screens/Register';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
  })
  if(!fontsLoaded)
    return null;

SplashScreen.hideAsync();

  return (
    <ThemeProvider theme={theme}>
      <Register />
    </ThemeProvider>
  );
}
