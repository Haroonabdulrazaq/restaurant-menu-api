// import React from 'react';
// import { StyleSheet, View, Text, Pressable } from 'react-native';
// import { QRCodeScanner } from '@/components/QRCodeScanner';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import Ionicons from '@expo/vector-icons/Ionicons';

// type RootStackParamList = {
//   drawer: { screen: 'RestaurantMenu'; params: { restaurantId: string } };
// };

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// export default function HomeScreen() {
//   const navigation = useNavigation<NavigationProp>();

//   const handleScan = (data: string) => {
//     const restaurantId = data;
//     console.log('|||||||-----|||||||||||');
//     console.log(restaurantId);
//     console.log('|||||||-----|||||||||||');
//     navigation.navigate('drawer', {
//       screen: 'restaurant',
//       params: { restaurantId },
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Scan Restaurant QR Code</Text>
//       <View style={styles.qrCodeScannerContainer}>
//         <QRCodeScanner onScan={handleScan} />
//       </View>
//       <Pressable style={styles.scanButton}>
//         <Text style={styles.scanButtonText}>
//           <Ionicons name="scan" size={24} color="white" />
//           Scan QR Code
//         </Text>
//       </Pressable>
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
//   qrCodeScannerContainer: {
//     width: '100%',
//     height: '30%',
//   },
//   scanButton: {
//     alignSelf: 'flex-end',
//     backgroundColor: 'blue',
//     padding: 10,
//     borderRadius: 5,
//   },
//   scanButtonText: {
//     color: 'white',
//   },
// });
