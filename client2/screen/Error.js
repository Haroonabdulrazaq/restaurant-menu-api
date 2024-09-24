import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Error = ({ route }) => {
  const { message } = route.params;
  return (
    <View style={styles.container}>
      <Text>Oops! Something went wrong</Text>
      <Text>{message}</Text>
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
  homeLink: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
