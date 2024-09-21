import React from 'react';
import { Text, View } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flex: 1, marginTop: 48 }}>
        <DrawerItemList {...props} />
      </View>
      <Text
        style={{
          padding: 16,
          textAlign: 'center',
          color: 'white',
          fontStyle: 'italic',
        }}
      >
        Your satisfaction is our concern
      </Text>
    </DrawerContentScrollView>
  );
}

const drawerIcon = (iconName: string) => {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === 'dark' ? 'white' : 'black';
  return (
    <MaterialCommunityIcons
      name={iconName as keyof typeof MaterialCommunityIcons.glyphMap}
      size={24}
      color={iconColor}
    />
  );
};

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerPosition: 'left',
        drawerType: 'front',
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Home',
          title: 'Home',
          drawerIcon: () => drawerIcon('home'),
        }}
      />
      <Drawer.Screen
        name="restaurant"
        options={{
          drawerLabel: 'Restaurant',
          title: 'Restaurant',
          drawerIcon: () => drawerIcon('food'),
        }}
      />
    </Drawer>
  );
}
