import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screen/Home';
import Restaurant from '../screen/Restaurant';
import Checkout from '../screen/Checkout';
import Login from '../screen/Login';

const Stack = createStackNavigator();

function MyStack({ initialRoute }) {
  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Restaurant" component={Restaurant} />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default MyStack;
