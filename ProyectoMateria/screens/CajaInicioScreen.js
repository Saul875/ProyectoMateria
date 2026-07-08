//zona1: importaciones
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';

const gridCards = [
  { icon: 'trending-up',   color: '#20C997', label: 'Ganancias',   value: '$3,480.00', onPress: null },
  { icon: 'trending-down', color: '#EF4444', label: 'Gastos',      value: '$450.00',   onPress: null },
  { icon: null,            color: '#3B82F6', label: 'Caja Actual', value: '$2,500.00', onPress: 'Cuenta', isDollar: true },
];

const tabs = [
  { label: 'Caja',  active: true,  onPress: null },
];

//Zona2: componente
export default function CajaInicioScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Caja - Inicio" />
      <SubHeader
        title="Coffee"
        subtitle="Integrated Management System"
        rightIconName="currency-usd"
        rightIconLibrary="MaterialCommunityIcons"
        rightIconColor="#28A745"
        showBorder
      />

      <View style={styles.tabsMenu}>
        {tabs.map((tab, i) => (
          <TouchableOpacity key={i} style={tab.active ? styles.tabItemActive : styles.tabItem} onPress={() => tab.onPress && navigation.navigate(tab.onPress)}>
            <Text style={tab.active ? styles.tabTextActive : styles.tabText}>{tab.label}</Text>
            {tab.active && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.grid}>
        <View style={styles.row}>
          {gridCards.slice(0, 2).map((card, i) => (
            <View key={i} style={styles.card}>
              <View style={[styles.circleIcon, { backgroundColor: card.color }]}>
                <Ionicons name={card.icon} size={24} color="#FFF" />
              </View>
              <Text style={styles.cardLabel}>{card.label}</Text>
              <Text style={styles.cardValue}>{card.value}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.cardWide} onPress={() => navigation.navigate('Cuenta')}>
          <View style={[styles.circleIcon, { backgroundColor: '#3B82F6' }]}>
            <Text style={{ color: '#FFF', fontSize: 24, fontWeight: 'bold' }}>$</Text>
          </View>
          <View>
            <Text style={styles.cardLabel}>Caja Actual</Text>
            <Text style={styles.cardValue}>$2,500.00</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

//Zona3: estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F3EA',
  },
  tabsMenu: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  tabItemActive: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 8,
  },
  tabTextActive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5B3E31',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#9E8A7D',
  },
  tabIndicator: {
    height: 3,
    backgroundColor: '#5B3E31',
    width: 20,
    marginTop: 4,
    borderRadius: 2,
  },
  grid: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  circleIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 15,
  },
  cardLabel: {
    fontSize: 14,
    color: '#9E8A7D',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5B3E31',
  },
  cardValueText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5B3E31',
  },
  cardWide: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 20,
    gap: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
});
