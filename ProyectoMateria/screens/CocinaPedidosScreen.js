//zona1: importaciones
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import { StatsBar } from '../components/StatsBar';
import ConfirmModal from '../components/ConfirmModal';

const stats = [
  { number: '3', label: 'Pendientes', color: '#E87D29' },
  { number: '12', label: 'Completados hoy', color: '#28A745' },
  { number: '15', label: 'Total hoy', color: '#5B3E31' },
];

const orders = [
  { mesa: '1', mesero: 'Carlos', tiempo: '12 min', items: [{ name: 'Cappuccino', qty: 2 }, { name: 'Croissant', qty: 1 }] },
  { mesa: '3', mesero: 'María', tiempo: '5 min',  items: [{ name: 'Espresso', qty: 1 }, { name: 'Moca', qty: 2 }] },
  { mesa: '5', mesero: 'Pedro', tiempo: '20 min', items: [{ name: 'Latte', qty: 3 }] },
];

//Zona2: componente
export default function CocinaPedidosScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = React.useState(null);
  const [modalAction, setModalAction] = React.useState(''); // 'cancelar' o 'completar'

  const confirmarCancelar = (pedido) => {
    setPedidoSeleccionado(pedido);
    setModalAction('cancelar');
    setModalVisible(true);
  };

  const confirmarCompletar = (pedido) => {
    setPedidoSeleccionado(pedido);
    setModalAction('completar');
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Cocina - Pedidos" />
      <SubHeader
        title="Revisar Pedidos"
        subtitle="Pedidos desde mesero"
        rightText="Inventario"
        rightIconColor="#D29034"
        onRightIconPress={() => navigation.navigate('Inventario')}
      />

      <StatsBar stats={stats} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {orders.map((order, i) => (
          <View key={i} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.tableInfo}>
                <View style={styles.tableBadge}>
                  <Text style={styles.tableBadgeText}>{order.mesa}</Text>
                </View>
                <View>
                  <Text style={styles.tableName}>Mesa {order.mesa}</Text>
                  <Text style={styles.waiterName}>Mesero: {order.mesero}</Text>
                </View>
              </View>
              <View style={styles.timerBadge}>
                <Ionicons name="time-outline" size={14} color="#E87D29" />
                <Text style={styles.timerText}>{order.tiempo}</Text>
              </View>
            </View>

            <View style={styles.itemsList}>
              {order.items.map((item, j) => (
                <View key={j} style={styles.itemRow}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <View style={styles.itemQtyBadge}>
                    <Text style={styles.itemQtyText}>{item.qty}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.btnComplete} onPress={() => confirmarCompletar(order)}>
                <Ionicons name="checkmark" size={18} color="#FFF" />
                <Text style={styles.btnText}>Completar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnCancel} onPress={() => confirmarCancelar(order)}>
                <Ionicons name="close" size={18} color="#FFF" />
                <Text style={styles.btnText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <ConfirmModal
        visible={modalVisible}
        title={modalAction === 'completar' ? "Completar Pedido" : "Cancelar Pedido"}
        message={
            modalAction === 'completar' 
            ? `¿Estás seguro que deseas marcar como completado el pedido de la Mesa ${pedidoSeleccionado?.mesa}?`
            : `¿Estás seguro que deseas cancelar el pedido de la Mesa ${pedidoSeleccionado?.mesa}?`
        }
        onConfirm={() => {
          setModalVisible(false);
          setPedidoSeleccionado(null);
          // Lógica para completar o cancelar el pedido
        }}
        onCancel={() => {
          setModalVisible(false);
          setPedidoSeleccionado(null);
        }}
        confirmText={modalAction === 'completar' ? "Completar Pedido" : "Cancelar Pedido"}
      />
    </SafeAreaView>
  );
}

//Zona3: estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F3EA',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  tableInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tableBadge: {
    backgroundColor: '#E87D29',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  tableBadgeText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5B3E31',
  },
  waiterName: {
    fontSize: 12,
    color: '#9E8A7D',
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDECE4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timerText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#E87D29',
    marginLeft: 4,
  },
  itemsList: {
    marginBottom: 15,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    color: '#5B3E31',
  },
  itemQtyBadge: {
    backgroundColor: '#5B3E31',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemQtyText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  btnComplete: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#28A745',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 25,
  },
  btnCancel: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 25,
  },
  btnText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 6,
  },
});
