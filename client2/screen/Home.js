import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { QRCodeScanner } from '../components/QRCodeScanner';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Home() {
  const [showCamera, setShowCamera] = useState(false);
  const navigation = useNavigation();

  const handleScan = (data) => {
    const restaurantId = data;
    navigation.navigate('Restaurant', { restaurantId: restaurantId });
    setShowCamera(false);
  };

  return (
    <View style={styles.container}>
      {showCamera ? (
        <View style={styles.qrCodeScannerContainer}>
          <QRCodeScanner onScan={handleScan} />
        </View>
      ) : (
        <View style={styles.fullScreenImageContainer}>
          <View style={styles.descriptiveContainer}>
            <Text style={styles.descriptiveText}>
              Scan QR Code to Order our menu
            </Text>
          </View>
          <Image
            source={require('../assets/images/restaurant-background.jpg')}
            style={styles.fullScreenImage}
            resizeMode="contain"
          />
        </View>
      )}
      <Pressable
        style={styles.scanButton}
        onPress={() => setShowCamera(!showCamera)}
      >
        {showCamera ? (
          <Text style={styles.scanButtonText}>
            Cancel Scan <Ionicons name="scan" size={13} color="white" />
          </Text>
        ) : (
          <Text style={styles.scanButtonText}>
            Scan QR Code <Ionicons name="scan" size={13} color="white" />
          </Text>
        )}
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
    height: '100%',
  },
  descriptiveContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 40,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#202020',
    top: 100,
    alignSelf: 'center',
    zIndex: 1,
  },
  descriptiveText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  scanButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 200,
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
