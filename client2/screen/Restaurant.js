import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { convertCentsToDollars, errorLogger } from '../utils';
import IonIcon from 'react-native-vector-icons/Ionicons';
import axiosInstance from '../utils/axiosInstance';

export default function Restaurant({ route, navigation }) {
  const { restaurantId } = route.params;
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [restaurantName, setRestaurantName] = useState('');
  const [loading, setLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // For testing purpose, restaurant ID can't be greater than 4
        if (Number(restaurantId) > 4) {
          navigation.navigate('Error', {
            message: 'Restaurant is not registered',
          });
          return;
        }
        const response = await axiosInstance.get(`menu/${restaurantId}`);
        if (response.status === 404) {
          navigation.navigate('Error', {
            message: response.data.error,
          });
        }
        setMenuItems(response.data);
        setRestaurantName(response.data[0].restaurant.name);
        setLoading(false);
      } catch (error) {
        navigation.navigate('Error', {
          message: error.response.data,
        });
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
        style={isInCart ? styles.selectedMenuItem : styles.menuItem}
        onPress={() =>
          isInCart ? removeItemFromCheckout(item) : addItemToCheckout(item)
        }
      >
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemDescription}>{description}</Text>
        <Text style={styles.itemIngredients}>Ingredients: </Text>
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
  const renderCartItem = ({ item }) => {
    return (
      <View style={styles.cartItem}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>
          ${convertCentsToDollars(item.price)}
        </Text>
      </View>
    );
  };
  const getTotalPrice = (cart) => {
    const result = cart.reduce(
      (totalPrice, item) => totalPrice + convertCentsToDollars(item.price),
      0
    );
    return result.toFixed(2);
  };

  const handleCheckout = async () => {
    setIsClicked(true);
    try {
      const response = await axiosInstance.post('/order', {
        restaurantId: Number(restaurantId),
        menuItemIds: cart.map((item) => item.id),
        totalPrice: getTotalPrice(cart) * 100,
      });

      if (response.status === 200) {
        setCart([]);
        navigation.navigate('Checkout', {
          message: response.data.message || 'Order placed successfully',
        });
        setModalVisible(false);
      }
      setIsClicked(false);
    } catch (error) {
      errorLogger(error);
      console.error(error.response.data);
      setIsClicked(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2ecc71" />
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
        ListFooterComponent={<Text style={styles.footer}> </Text>}
      />
      <Pressable
        style={styles.checkoutButton}
        disabled={cart.length === 0}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.checkoutButtonText}>
          Checkout{' $'}
          {getTotalPrice(cart)}
        </Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <Pressable
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>
              <IonIcon name="close" size={24} />
            </Text>
          </Pressable>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Summary</Text>
            <FlatList
              data={cart}
              renderItem={({ item }) => (
                <View>
                  {renderCartItem({ item })}
                  <View style={styles.horizontalLine} />
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
            <Text style={styles.modalTotal}>Total: ${getTotalPrice(cart)}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleCheckout}
            >
              {isClicked ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.modalButtonText}>Confirm Checkout</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  selectedMenuItem: {
    borderWidth: 0.8,
    borderColor: '#2ecc71',
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
  itemIngredients: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
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
  horizontalLine: {
    height: 1,
    width: '100%',
    backgroundColor: '#ddd',
    marginVertical: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cartItemName: {
    fontSize: 18,
  },
  modalTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    paddingTop: 20,
  },
  modalButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
  },
  closeButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 50,
    position: 'absolute',
    top: 5,
    right: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
  },
  footer: {
    height: 80,
  },
});
