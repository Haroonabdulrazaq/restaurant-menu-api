import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Error = ({ route }) => {
  const { message } = route.params;
  return (
    <View>
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
  homeLink: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
