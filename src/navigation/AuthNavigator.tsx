import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from '@hooks';
import {
  HomeScreen,
  Homepage,
  Notifications,
  Activity,
  ViewImage,
  Profile,
  AddContact,
  HelloWorld,
  CreateStart,
  CreateActivity,
} from '@screens';
const AuthStack = createStackNavigator();
const AuthNavigator = () => {
  const {t} = useTranslation();

  return (
    <AuthStack.Navigator headerMode="none" mode="modal">
      {/* <AuthStack.Screen
        name={t('Hello')}
        component={HelloWorld}
        options={{headerShown: false}}
      /> */}
      <AuthStack.Screen
        name={t('Homepage')}
        component={Homepage}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={t('CreateStart')}
        component={CreateStart}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={t('CreateActivity')}
        component={CreateActivity}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={t('Activity')}
        component={Activity}
        options={{headerShown: true}}
      />
      <AuthStack.Screen
        name={t('ViewImage')}
        component={ViewImage}
        options={{headerShown: true}}
      />
      <AuthStack.Screen
        name={t('Notifications')}
        component={Notifications}
        options={{headerShown: true}}
      />
      <AuthStack.Screen
        name={t('Home')}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={t('Profile')}
        component={Profile}
        options={{headerShown: true}}
      />
      <AuthStack.Screen
        name={t('AddContact')}
        component={AddContact}
        options={{headerShown: true}}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
