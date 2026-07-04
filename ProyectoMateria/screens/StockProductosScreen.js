//zona1: importaciones
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import ConfirmModal from '../components/ConfirmModal';
import ActionButton from '../components/ActionButton';

const products = [
  { name: 'Café Latte',   qty: 10, unit: 'bolsas', status: 'active' },
  { name: 'Leche Entera', qty: 5,  unit: 'cajas',  status: 'low' },
  { name: 'Azúcar',       qty: 20, unit: 'kg',      status: 'active' },
  { name: 'Vainilla',     qty: 2,  unit: 'frascos', status: 'low' },
  { name: 'Canela',       qty: 8,  unit: 'botes',   status: 'active' },
];

//Zona2: componente
export default function StockProductosScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalSolicitudVisible, setModalSolicitudVisible] = React.useState(false);
  const [modalExitoVisible, setModalExitoVisible] = React.useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = React.useState(null);

  const confirmarEliminar = (producto) => {
    setProductoSeleccionado(producto);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Stock - Gestión" />
      <SubHeader
        title="Stock de Productos"
        subtitle="Gestión de inventario"
        rightIconName="cube"
        rightIconLibrary="Ionicons"
        rightIconColor="#D97706"
        showBorder
      />

      <View style={styles.actionBar}>
        <View>
          <Text style={styles.countNumber}>{products.length}</Text>
          <Text style={styles.countText}>Productos</Text>
        </View>
        <View style={styles.btnsRow}>
          <TouchableOpacity style={styles.btnAdd}>
            <Ionicons name="add" size={16} color="#FFF" />
            <Text style={styles.btnText}>Agregar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnRequest} onPress={() => setModalSolicitudVisible(true)}>
            <Ionicons name="paper-plane-outline" size={16} color="#FFF" />
            <Text style={styles.btnText}>Solicitud</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        <View style={styles.tableCard}>
          <View style={styles.tableHeader}>
            <Text style={[styles.th, { flex: 2 }]}>Producto</Text>
            <Text style={styles.th}>Cant.</Text>
            <Text style={styles.th}>Unidad</Text>
            <Text style={styles.th}>Acción</Text>
          </View>
          {products.map((p, i) => (
            <View key={i}>
              <View style={styles.tableRow}>
                <View style={{ flex: 2 }}>
                  <Text style={styles.tdTitle}>{p.name}</Text>
                </View>
                <Text style={styles.tdQty}>{p.qty}</Text>
                <Text style={styles.tdUnit}>{p.unit}</Text>
                <View style={styles.tdActions}>
                  <TouchableOpacity style={[styles.iconBtn, { backgroundColor: '#F59E0B' }]}>
                    <Ionicons name="pencil" size={14} color="#FFF" />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.iconBtn, { backgroundColor: '#EF4444' }]} onPress={() => confirmarEliminar(p)}>
                    <Ionicons name="trash-outline" size={14} color="#FFF" />
                  </TouchableOpacity>
                </View>
              </View>
              {i < products.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>
      </ScrollView>

      <ConfirmModal
        visible={modalVisible}
        title="Eliminar Producto"
        message={`¿Estás seguro que deseas eliminar "${productoSeleccionado?.name}" del inventario?`}
        onConfirm={() => {
          setModalVisible(false);
          setProductoSeleccionado(null);
          // Lógica para eliminar producto
        }}
        onCancel={() => {
          setModalVisible(false);
          setProductoSeleccionado(null);
        }}
        confirmText="Eliminar"
      />

      {/* Modal de Solicitud de Suministros */}
      <Modal visible={modalSolicitudVisible} transparent animationType="slide">
        <View style={styles.modalOverlayFull}>
          <View style={styles.modalContentFull}>
            <View style={styles.cardSolicitud}>
              <Text style={styles.cardTitle}>Solicitud de Productos</Text>
              <Text style={styles.cardSub}>Restock de suministros</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Tipo de Producto</Text>
              <TextInput style={styles.input} placeholder="Ej. Café, Leche..." />
            </View>

            <ActionButton 
              label="Confirmar Solicitud" 
              color="#6B7280" 
              iconName="checkmark" 
              onPress={() => {
                setModalSolicitudVisible(false);
                setTimeout(() => setModalExitoVisible(true), 300); // Pequeño delay para que no se encimen las animaciones
              }} 
            />
            <ActionButton label="Cancelar Solicitud"  color="#EF4444" iconName="close" onPress={() => setModalSolicitudVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Modal de Éxito */}
      <Modal visible={modalExitoVisible} transparent animationType="fade">
        <View style={styles.modalOverlayCenter}>
          <View style={styles.modalExitoCard}>
            <Ionicons name="checkmark-circle" size={70} color="#28A745" style={{ marginBottom: 15 }} />
            <Text style={styles.modalTitleExito}>¡Solicitud Realizada!</Text>
            <Text style={styles.modalSubExito}>Tu solicitud ha sido enviada al administrador exitosamente.</Text>
            
            <TouchableOpacity style={styles.btnOk} onPress={() => setModalExitoVisible(false)}>
              <Text style={styles.btnOkText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const shadow = {
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.05,
  shadowRadius: 8,
};

const shadowLight = {
  elevation: 2,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 5,
};

const rowCenter = {
  flexDirection: 'row',
  alignItems: 'center',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F3EA',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  actionBar: {
    ...shadow,
    ...rowCenter,
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
  },
  countNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5B3E31',
  },
  countText: {
    fontSize: 12,
    color: '#9E8A7D',
  },
  btnsRow: {
    flexDirection: 'row',
  },
  btnAdd: {
    ...rowCenter,
    backgroundColor: '#28A745',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    marginRight: 10,
  },
  btnRequest: {
    ...rowCenter,
    backgroundColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
  },
  btnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 4,
  },
  tableCard: {
    ...shadow,
    backgroundColor: '#FFF',
    borderRadius: 20,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#785A46',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  th: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
  },
  tableRow: {
    ...rowCenter,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  tdTitle: {
    color: '#5B3E31',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tdQty: {
    flex: 1,
    color: '#5B3E31',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tdUnit: {
    flex: 1,
    color: '#9E8A7D',
    fontSize: 12,
  },
  tdActions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 15,
  },
  modalOverlayFull: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContentFull: {
    backgroundColor: '#F9F3EA',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingBottom: 40,
  },
  cardSolicitud: {
    ...shadowLight,
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5B3E31',
  },
  cardSub: {
    fontSize: 14,
    color: '#9E8A7D',
    marginTop: 4,
  },
  inputGroup: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5B3E31',
    marginBottom: 10,
  },
  input: {
    ...shadowLight,
    backgroundColor: '#FFF',
    height: 50,
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  modalOverlayCenter: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalExitoCard: {
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 30,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
  },
  modalTitleExito: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5B3E31',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSubExito: {
    fontSize: 14,
    color: '#9E8A7D',
    marginBottom: 25,
    textAlign: 'center',
    lineHeight: 20,
  },
  btnOk: {
    backgroundColor: '#28A745',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
  },
  btnOkText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

