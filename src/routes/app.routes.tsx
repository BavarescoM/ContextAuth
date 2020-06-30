import React from 'react';
import DashBoard from '../pages/DashBoard';

import {createStackNavigator} from '@react-navigation/stack';

const AppStack = createStackNavigator();
const AuthRoutes: React.FC = () => (
  <AppStack.Navigator>
    <AppStack.Screen name="DashBoard" component={DashBoard} />
  </AppStack.Navigator>
);

export default AuthRoutes;
