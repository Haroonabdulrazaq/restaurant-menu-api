import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { QRCodeScanner } from '../components/QRCodeScanner';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const [showCamera, setShowCamera] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      if (!userToken) {
        navigation.navigate('Login');
      }
    };

    checkUserLoggedIn();
  }, []);

  const handleScan = (data) => {
    const restaurantId = data;
    navigation.navigate('Restaurant', { restaurantId: restaurantId });
    setShowCamera(false);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} backgroundColor="#000" />
      {showCamera ? (
        <View style={styles.qrCodeScannerContainer}>
          <QRCodeScanner onScan={handleScan} />
        </View>
      ) : (
        <View style={styles.fullScreenImageContainer}>
          <View style={styles.descriptiveContainer}>
            <Text style={styles.descriptiveText}>
              Scan QR Code to order our menu
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
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </Pressable>
    </SafeAreaView>
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
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 10,
    right: 10,
  },
  logoutButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
