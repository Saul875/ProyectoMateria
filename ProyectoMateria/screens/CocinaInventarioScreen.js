//zona1: importaciones
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import { StatsBar } from '../components/StatsBar';

const stats = [
  { number: '5', label: 'Disponibles', color: '#28A745' },
  { number: '3', label: 'Bajo Stock',  color: '#D97706' },
  { number: '0', label: 'Agotados',    color: '#EF4444' },
];

const items = [
  { name: 'Café en grano', unit: 'kg',     stock: 25, status: 'Disponible', statusColor: '#28A745', badgeColor: '#E5F6EB', minStock: '10 kg',     alert: null },
  { name: 'Leche',         unit: 'litros', stock: 15, status: 'Bajo Stock',  statusColor: '#D97706', badgeColor: '#FEF3C7', minStock: '20 litros', alert: 'Necesita reabastecimiento' },
  { name: 'Crema batida',  unit: 'litros', stock: 8,  status: 'Disponible', statusColor: '#28A745', badgeColor: '#E5F6EB', minStock: '5 litros',  alert: null },
];

//Zona2: componente
export default function CocinaInventarioScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Cocina - Inventario" />
      <SubHeader
        title="Inventario"
        subtitle="Productos disponibles"
        rightIconName="chef-hat"
        rightIconLibrary="MaterialCommunityIcons"
        rightIconColor="#D29034"
      />

      <StatsBar stats={stats} />

      <TouchableOpacity style={styles.btnUpdate}>
        <Ionicons name="checkmark" size={20} color="#FFF" />
        <Text style={styles.btnUpdateText}>Actualizar Stock</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {items.map((item, i) => (
          <View key={i} style={[styles.card, { borderColor: item.badgeColor, borderWidth: 2 }]}>
            <View style={styles.cardHeader}>
              <View style={styles.itemInfo}>
                <View style={[styles.iconBox, { backgroundColor: item.statusColor }]}>
                  <Ionicons name="cube-outline" size={24} color="#FFF" />
                </View>
                <View>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemUnit}>{item.unit}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.stockNumber}>{item.stock}</Text>
                <Text style={styles.stockLabel}>Stock</Text>
              </View>
            </View>

            <View style={[styles.statusBadge, { backgroundColor: item.badgeColor }]}>
              <Ionicons name={item.status === 'Disponible' ? 'checkmark-square' : 'warning'} size={16} color={item.statusColor} />
              <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
            </View>

            <View style={styles.minStockRow}>
              <Text style={styles.minStockLabel}>Stock mínimo:</Text>
              <Text style={styles.minStockValue}>{item.minStock}</Text>
            </View>

            {item.alert && (
              <View style={styles.alertBox}>
                <Ionicons name="alert-circle-outline" size={16} color="#D97706" />
                <Text style={styles.alertText}>{item.alert}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

//Zona3: estilos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F3EA' },
  list: { paddingHorizontal: 20, paddingBottom: 100 },
  btnUpdate: { flexDirection: 'row', backgroundColor: '#3B82F6', alignSelf: 'flex-start', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginHorizontal: 20, marginBottom: 20, alignItems: 'center' },
  btnUpdateText: { color: '#FFF', fontWeight: 'bold', marginLeft: 8 },
  card: { backgroundColor: '#FFF', borderRadius: 20, padding: 20, marginBottom: 15, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  itemInfo: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  itemName: { fontSize: 18, fontWeight: 'bold', color: '#5B3E31' },
  itemUnit: { fontSize: 14, color: '#9E8A7D' },
  stockNumber: { fontSize: 24, fontWeight: 'bold', color: '#5B3E31', textAlign: 'right' },
  stockLabel: { fontSize: 12, color: '#9E8A7D', textAlign: 'right' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 8, borderRadius: 15, marginBottom: 15 },
  statusText: { fontWeight: 'bold', marginLeft: 6 },
  minStockRow: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: 15 },
  minStockLabel: { color: '#9E8A7D', fontSize: 14 },
  minStockValue: { fontWeight: 'bold', color: '#5B3E31', fontSize: 14 },
  alertBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFBEB', padding: 10, borderRadius: 10, marginTop: 15, borderWidth: 1, borderColor: '#FEF3C7' },
  alertText: { color: '#D97706', marginLeft: 8, fontSize: 12, fontWeight: '500' },
});
