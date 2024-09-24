import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Error = ({ route, navigation }) => {
  const { message } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Oops! Something went wrong</Text>
      <Text style={styles.errorOrderText}>{message}</Text>
      <Text style={styles.homeLink} onPress={() => navigation.navigate('Home')}>
        Go to Home
      </Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  errorOrderText: {
    fontSize: 16,
    color: '#333',
  },
  homeLink: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
