import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { QRCodeScanner } from '@/components/QRCodeScanner';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';

type RootStackParamList = {
  drawer: { screen: 'Restaurant'; params: { restaurantId: string } };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Index() {
  const [showCamera, setShowCamera] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const handleScan = (data: string) => {
    const restaurantId = data;
    console.log('||||||||||--------------||||||||||');
    console.log('restaurantId', restaurantId);
    navigation.navigate('drawer', {
      screen: 'Restaurant',
      params: { restaurantId },
    });
  };

  return (
    <View style={styles.container}>
      {showCamera ? (
        <View style={styles.qrCodeScannerContainer}>
          <QRCodeScanner onScan={handleScan} />
        </View>
      ) : (
        <View style={styles.fullScreenImageContainer}>
          <Image
            source={require('@/assets/images/restaurant-background.jpg')}
            style={styles.fullScreenImage}
            resizeMode="contain"
          />
        </View>
      )}
      <Pressable
        style={styles.scanButton}
        onPress={() => setShowCamera(!showCamera)}
      >
        <Text style={styles.scanButtonText}>
          Scan QR Code <Ionicons name="scan" size={13} color="white" />
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  qrCodeScannerContainer: {
    width: '100%',
    height: '30%',
  },
  scanButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 15,
  },
  scanButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fullScreenImageContainer: {
    width: '100%',
    height: '100%',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});
