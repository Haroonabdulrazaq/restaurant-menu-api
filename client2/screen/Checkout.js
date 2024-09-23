import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Checkout = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.successText}>Success!</Text>
      <Text style={styles.successOrderText}>
        Order has been received by the kitchen
      </Text>
      <Text style={styles.homeLink} onPress={() => navigation.navigate('Home')}>
        Go to Home
      </Text>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  successOrderText: {
    fontSize: 16,
  },
  homeLink: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
