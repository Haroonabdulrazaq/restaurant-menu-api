import { NativeStackNavigationProp } from '@react-navigation/native-stack';
export type RootStackParamList = {
  restaurant: { restaurantId: string };
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
export interface IRouteParams {
  restaurantId: string;
}

export interface IMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
}
