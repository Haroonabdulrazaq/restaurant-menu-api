// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { RouteProp } from '@react-navigation/native';

// type RestaurantMenuScreenProps = {
//   route: RouteProp<
//     { RestaurantMenu: { restaurantId: string } },
//     'RestaurantMenu'
//   >;
// };

// export default function RestaurantMenuScreen({
//   route,
// }: RestaurantMenuScreenProps) {
//   const { restaurantId } = route.params;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Restaurant Menu</Text>
//       <Text>Restaurant ID: {restaurantId}</Text>
//       {/* Add more components to display the restaurant's menu */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
// });
