import * as React from 'react';
import {
  useTranslation,
  useGlobal,
  useTheme,
  useNavigation,
  useRoute,
} from '@hooks';

import {enableScreens} from 'react-native-screens';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {themes} from '@themes';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';

enableScreens();

const RootStack = createStackNavigator();

const AppNavigator: React.ForwardRefRenderFunction<
  NavigationContainerRef,
  TProps
> = ({hidden, onStateChange}, ref) => {
  const [token] = useGlobal('token');
  const {t} = useTranslation();
  const [styles] = useTheme(themes);

  return hidden ? null : (
    <NavigationContainer onStateChange={onStateChange}>
      <RootStack.Navigator headerMode="screen">
        {/* {!token ? (
          <RootStack.Screen
            name="MainNavigator"
            options={{headerShown: false, animationEnabled: false}}
            component={MainNavigator}
          />
        ) : (
          <RootStack.Screen
            name="AUTH_NAVIGATOR"
            options={{headerShown: false, animationEnabled: false}}
            component={AuthNavigator}
          />
        )} */}
        <RootStack.Screen
          name="AUTH_NAVIGATOR"
          options={{ headerShown: false, animationEnabled: false }}
          component={AuthNavigator}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

type TProps = {
  hidden?: boolean;
  onStateChange?: (state: any | undefined) => void;
};

export default AppNavigator;
