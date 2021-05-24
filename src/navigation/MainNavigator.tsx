import * as React from 'react';
import {SignIn, SignUp, SignUpNext} from '@screens';
import {createStackNavigator} from '@react-navigation/stack';

const MainStack = createStackNavigator();
const MainNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="SignUpNext"
        component={SignUpNext}
        options={{title: 'Back'}}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
