import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screen/Home';
import Restaurant from '../screen/Restaurant';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Restaurant" component={Restaurant} />
    </Stack.Navigator>
  );
}

export default MyStack;
