import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
// import { useAuth } from '../store/userStore';

const RootNavigator = () => {
  // const { isLoggedIn } = useAuth();

  return (
    <NavigationContainer>
      {/* {isLoggedIn ? <AppStack /> : <AuthStack />} */}
      <AuthStack/>
    </NavigationContainer>
  );
};

export default RootNavigator;
