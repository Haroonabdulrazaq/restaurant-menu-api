import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button,
  Pressable,
} from 'react-native';
import { convertCentsToDollars, errorLogger } from '../utils';
import IonIcon from 'react-native-vector-icons/Ionicons';

export default function Restaurant({ route }) {
  const { restaurantId } = route.params;
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [restaurantName, setRestaurantName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      let token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTcyNzA4NDY0NCwiZXhwIjoxNzI3MTcxMDQ0fQ.aBMbX6FYMjJF5DsIw8ilzvTSyoZbWpYdEQiAgZSTMxo';
      try {
        const response = await axios.get(
          `http://192.168.1.21:3000/api/menu/${restaurantId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMenuItems(response.data);
        setRestaurantName(response.data[0].restaurant.name);
        setLoading(false);
      } catch (error) {
        setError(error.response.data);
        errorLogger(error);
      }
    };

    fetchMenuItems();
  }, []);

  const addItemToCheckout = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeItemFromCheckout = (item) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.id !== item.id)
    );
  };

  const renderMenuItem = ({ item }) => {
    const { name, description, price, ingredients, calories } = item;
    const isInCart = cart.some((cartItem) => cartItem.id === item.id);
    return (
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() =>
          isInCart ? removeItemFromCheckout(item) : addItemToCheckout(item)
        }
      >
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemDescription}>{description}</Text>
        <Text style={styles.itemDescription}>{ingredients.join(', ')}</Text>
        <Text style={styles.itemDescription}>{calories} calories</Text>
        <Text style={styles.itemPrice}>${convertCentsToDollars(price)}</Text>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() =>
            isInCart ? removeItemFromCheckout(item) : addItemToCheckout(item)
          }
        >
          <Text style={styles.iconText}>
            {isInCart ? <IonIcon name="remove" /> : <IonIcon name="add" />}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading menu...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{restaurantName}</Text>
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Pressable style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Checkout {cart.length}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  menuItem: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginTop: 8,
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  iconButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#bbb',
    padding: 5,
  },
  iconText: {
    fontSize: 24,
    color: '#333',
  },
  checkoutButton: {
    position: 'absolute',
    bottom: 5,
    width: '100%',
    backgroundColor: '#2ecc71',
    padding: 16,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
