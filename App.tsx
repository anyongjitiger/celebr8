/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { useColorScheme } from 'react-native';
import { light, dark } from '@themes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';
import { AppNavigator } from "@navigation";
import { NavigationContainerRef } from '@react-navigation/native'
// import SplashScreen from 'react-native-splash-screen';

const App: React.FC<void> = () => {
  let isDarkMode = useColorScheme() === 'dark';
  const onStateChange = (state: any) => {
    // if (__DEV__) console.log('state change', state);
  }

  /* exec splash screen */
  // SplashScreen.hide();
  const navigatorref: React.RefObject<NavigationContainerRef> = React.createRef();

  const styles = useColorScheme() == 'dark' ? { ...light, ...dark } : light;

  return (
    <SafeAreaProvider>
      <ThemeProvider useDark={isDarkMode} theme={styles}>
        <AppNavigator hidden={false} onStateChange={onStateChange}></AppNavigator>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
