import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import Screens
import CajaInicioScreen from './screens/CajaInicioScreen';
import CocinaPedidosScreen from './screens/CocinaPedidosScreen';
import CajaCuentaScreen from './screens/CajaCuentaScreen';
import StockProductosScreen from './screens/StockProductosScreen';
import CocinaInventarioScreen from './screens/CocinaInventarioScreen';
import SolicitudSuministrosScreen from './screens/SolicitudSuministrosScreen';
import MesasScreen from './screens/MesasScreen';

const Tab = createBottomTabNavigator();

// --- STACKS PARA LAS PESTAÑAS ---
// Stack de Cocina
const CocinaStack = createNativeStackNavigator();
function CocinaNavigator() {
  return (
    <CocinaStack.Navigator screenOptions={{ headerShown: false }}>
      <CocinaStack.Screen name="Pedidos" component={CocinaPedidosScreen} />
      <CocinaStack.Screen name="Inventario" component={CocinaInventarioScreen} />
    </CocinaStack.Navigator>
  );
}

// Stack de Caja
const CajaStack = createNativeStackNavigator();
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
                tabBarStyle: {
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
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === 'Inicio') {
                    iconName = focused ? 'home' : 'home-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                  } else if (route.name === 'Cocina') {
                    iconName = focused ? 'cafe' : 'cafe-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                  } else if (route.name === 'Caja') {
                    iconName = focused ? 'cash' : 'cash-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                  } else if (route.name === 'Stock') {
                    iconName = focused ? 'cube' : 'cube-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                  }
                },
              })}
            >
              <Tab.Screen name="Inicio" component={CajaNavigator} />
              <Tab.Screen name="Cocina" component={CocinaNavigator} />
              <Tab.Screen name="Caja" component={CajaCuentaScreen} />
              <Tab.Screen name="Stock" component={StockProductosScreen} />
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
});
