import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Screens actuales
import CajaInicioScreen from './screens/CajaInicioScreen';
import CocinaPedidosScreen from './screens/CocinaPedidosScreen';
import CajaCuentaScreen from './screens/CajaCuentaScreen';
import StockProductosScreen from './screens/StockProductosScreen';
import CocinaInventarioScreen from './screens/CocinaInventarioScreen';
import SolicitudSuministrosScreen from './screens/SolicitudSuministrosScreen';
import MesasScreen from './screens/MesasScreen';

// Nuevos screens cliente
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import MenuClienteScreen from './screens/MenuClienteScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import OrdersClienteScreen from './screens/OrdersClienteScreen';
import OrderDetailsClienteScreen from './screens/OrderDetailsClienteScreen';

const Tab = createBottomTabNavigator();
const CocinaStack = createNativeStackNavigator();
const CajaStack = createNativeStackNavigator();
const ClienteStack = createNativeStackNavigator();

function CocinaNavigator() {
  return (
    <CocinaStack.Navigator screenOptions={{ headerShown: false }}>
      <CocinaStack.Screen name="Pedidos" component={CocinaPedidosScreen} />
      <CocinaStack.Screen name="Inventario" component={CocinaInventarioScreen} />
    </CocinaStack.Navigator>
  );
}

function CajaNavigator() {
  return (
    <CajaStack.Navigator screenOptions={{ headerShown: false }}>
      <CajaStack.Screen name="InicioCaja" component={CajaInicioScreen} />
      <CajaStack.Screen name="Cuenta" component={CajaCuentaScreen} />
      <CajaStack.Screen name="Suministros" component={SolicitudSuministrosScreen} />
      <CajaStack.Screen name="Mesas" component={MesasScreen} />
    </CajaStack.Navigator>
  );
}

function ClienteNavigator() {
  return (
    <ClienteStack.Navigator screenOptions={{ headerShown: false }}>
      <ClienteStack.Screen name="Welcome" component={WelcomeScreen} />
      <ClienteStack.Screen name="Login" component={LoginScreen} />
      <ClienteStack.Screen name="MenuClienteScreen" component={MenuClienteScreen} />
      <ClienteStack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <ClienteStack.Screen name="OrdersCliente" component={OrdersClienteScreen} />
      <ClienteStack.Screen name="OrderDetailsCliente" component={OrderDetailsClienteScreen} />
    </ClienteStack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.webContainer}>
        <View style={styles.appWrapper}>
          <StatusBar style="auto" />

          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: '#5B3E31',
                tabBarInactiveTintColor: '#9E8A7D',
                tabBarStyle: styles.tabBar,
                tabBarIcon: ({ color, size, focused }) => {
                  let iconName = 'home-outline';

                  if (route.name === 'Inicio') {
                    iconName = focused ? 'home' : 'home-outline';
                  } else if (route.name === 'Cocina') {
                    iconName = focused ? 'cafe' : 'cafe-outline';
                  } else if (route.name === 'Caja') {
                    iconName = focused ? 'cash' : 'cash-outline';
                  } else if (route.name === 'Stock') {
                    iconName = focused ? 'cube' : 'cube-outline';
                  } else if (route.name === 'Cliente') {
                    iconName = focused ? 'person' : 'person-outline';
                  }

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
            >
              <Tab.Screen name="Inicio" component={CajaNavigator} />
              <Tab.Screen name="Cocina" component={CocinaNavigator} />
              <Tab.Screen name="Caja" component={CajaCuentaScreen} />
              <Tab.Screen name="Stock" component={StockProductosScreen} />
              <Tab.Screen name="Cliente" component={ClienteNavigator} />
            </Tab.Navigator>
          </NavigationContainer>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    backgroundColor: Platform.OS === 'web' ? '#e0e0e0' : '#F9F3EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 428 : '100%',
    maxHeight: Platform.OS === 'web' ? 926 : '100%',
    backgroundColor: '#F9F3EA',
    overflow: 'hidden',
    ...(Platform.OS === 'web' && {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 20,
      elevation: 10,
      borderRadius: 40,
      marginVertical: 20,
    }),
  },
  tabBar: {
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
});