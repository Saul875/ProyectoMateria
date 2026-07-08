//zona1: importaciones
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
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
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState('');
  const [nota, setNota] = useState('');
  const [enviado, setEnviado] = useState(false);

  const abrirSolicitud = (item) => {
    setProductoSeleccionado(item);
    setCantidad('');
    setNota('');
    setEnviado(false);
    setModalVisible(true);
  };

  const enviarSolicitud = () => {
    // Aquí se conectará con la API
    setEnviado(true);
    setTimeout(() => setModalVisible(false), 1800);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Cocina - Inventario" />
      <SubHeader
        title="Inventario"
        subtitle="Toca un producto para solicitar restock"
      />

      <StatsBar stats={stats} />

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.btnBack} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="#5B3E31" />
          <Text style={styles.btnBackText}>Volver</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {items.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.card, { borderColor: item.badgeColor, borderWidth: 2 }]}
            onPress={() => abrirSolicitud(item)}
            activeOpacity={0.85}
          >
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
              <View style={styles.stockRight}>
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

            <View style={styles.solicitudHint}>
              <Ionicons name="add-circle-outline" size={15} color="#8D7A4E" />
              <Text style={styles.solicitudHintText}>Toca para solicitar restock</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal de solicitud de restock */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>

            {enviado ? (
              <View style={styles.successBox}>
                <View style={styles.successIcon}>
                  <Ionicons name="checkmark" size={40} color="#FFF" />
                </View>
                <Text style={styles.successTitle}>¡Solicitud enviada!</Text>
                <Text style={styles.successSub}>El administrador recibirá la solicitud de restock.</Text>
              </View>
            ) : (
              <>
                <View style={styles.modalHeader}>
                  <View style={styles.modalProductIcon}>
                    <Ionicons name="cube-outline" size={28} color="#FFF" />
                  </View>
                  <View>
                    <Text style={styles.modalTitle}>{productoSeleccionado?.name}</Text>
                    <Text style={styles.modalSub}>Stock actual: {productoSeleccionado?.stock} {productoSeleccionado?.unit}</Text>
                  </View>
                </View>

                <View style={styles.divider} />

                <Text style={styles.inputLabel}>Cantidad solicitada ({productoSeleccionado?.unit})</Text>
                <TextInput
                  style={styles.input}
                  placeholder={`Ej. 20 ${productoSeleccionado?.unit}`}
                  keyboardType="numeric"
                  value={cantidad}
                  onChangeText={setCantidad}
                />

                <Text style={styles.inputLabel}>Nota para el administrador (opcional)</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Ej. Urgente, stock bajo crítico..."
                  multiline
                  numberOfLines={3}
                  value={nota}
                  onChangeText={setNota}
                />

                <View style={styles.btnRow}>
                  <TouchableOpacity style={styles.btnCancelar} onPress={() => setModalVisible(false)}>
                    <Text style={styles.btnCancelarText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.btnEnviar, !cantidad && styles.btnEnviarDisabled]}
                    onPress={enviarSolicitud}
                    disabled={!cantidad}
                  >
                    <Ionicons name="send-outline" size={18} color="#FFF" />
                    <Text style={styles.btnEnviarText}>Enviar Solicitud</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

          </View>
        </View>
      </Modal>
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
  actionRow: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  btnBack: {
    flexDirection: 'row',
    backgroundColor: '#E5DFD6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  btnBackText: {
    color: '#5B3E31',
    fontWeight: 'bold',
    marginLeft: 8,
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
    marginBottom: 15,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5B3E31',
  },
  itemUnit: {
    fontSize: 14,
    color: '#9E8A7D',
  },
  stockRight: {
    alignItems: 'flex-end',
  },
  stockNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5B3E31',
    textAlign: 'right',
  },
  stockLabel: {
    fontSize: 12,
    color: '#9E8A7D',
    textAlign: 'right',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 15,
    marginBottom: 15,
  },
  statusText: {
    fontWeight: 'bold',
    marginLeft: 6,
  },
  minStockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 15,
  },
  minStockLabel: {
    color: '#9E8A7D',
    fontSize: 14,
  },
  minStockValue: {
    fontWeight: 'bold',
    color: '#5B3E31',
    fontSize: 14,
  },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  alertText: {
    color: '#D97706',
    marginLeft: 8,
    fontSize: 12,
    fontWeight: '500',
  },
  solicitudHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  solicitudHintText: {
    color: '#8D7A4E',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 5,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 28,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalProductIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#8D7A4E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5B3E31',
  },
  modalSub: {
    fontSize: 13,
    color: '#9E8A7D',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5B3E31',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9F3EA',
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#5B3E31',
    marginBottom: 18,
  },
  textArea: {
    height: 85,
    textAlignVertical: 'top',
  },
  btnRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 5,
  },
  btnCancelar: {
    flex: 1,
    backgroundColor: '#E5DFD6',
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: 'center',
  },
  btnCancelarText: {
    color: '#5B3E31',
    fontWeight: 'bold',
    fontSize: 15,
  },
  btnEnviar: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#D97706',
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  btnEnviarDisabled: {
    backgroundColor: '#D5C9BD',
  },
  btnEnviarText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  // Success
  successBox: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#28A745',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5B3E31',
    marginBottom: 8,
  },
  successSub: {
    fontSize: 14,
    color: '#9E8A7D',
    textAlign: 'center',
    lineHeight: 20,
  },
});
