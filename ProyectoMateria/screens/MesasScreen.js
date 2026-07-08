//zona1: importaciones
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import ConfirmModal from '../components/ConfirmModal';

const mesasIniciales = [
  { id: 1, capacidad: 2 },
  { id: 2, capacidad: 4 },
  { id: 3, capacidad: 4 },
  { id: 4, capacidad: 6 },
  { id: 5, capacidad: 2 },
  { id: 6, capacidad: 8 },
  { id: 7, capacidad: 4 },
  { id: 8, capacidad: 6 },
];

const tabs = [
    { label: 'Menú', active: false, onPress: 'MenuClienteScreen' },
    { label: 'Mesas', active: true, onPress: null },
];

//Zona2: componente
export default function MesasScreen() {
  const navigation = useNavigation();
  const [mesas, setMesas] = useState(
    mesasIniciales.map(m => ({ ...m, ocupada: false, personas: 0 }))
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [personasSeleccionadas, setPersonasSeleccionadas] = useState(1);

  const ocupadas = mesas.filter(m => m.ocupada).length;
  const disponibles = mesas.filter(m => !m.ocupada).length;

  const abrirModal = (mesa) => {
    if (mesa.ocupada) {
      setMesaSeleccionada(mesa);
      setConfirmModalVisible(true);
      return;
    }
    setMesaSeleccionada(mesa);
    setPersonasSeleccionadas(1);
    setModalVisible(true);
  };

  const confirmarMesa = () => {
    setMesas(prev => prev.map(m =>
      m.id === mesaSeleccionada.id ? { ...m, ocupada: true, personas: personasSeleccionadas } : m
    ));
    setModalVisible(false);
    setMesaSeleccionada(null);
  };

  const confirmarDesocupar = () => {
    setMesas(prev => prev.map(m =>
      m.id === mesaSeleccionada.id ? { ...m, ocupada: false, personas: 0 } : m
    ));
    setConfirmModalVisible(false);
    setMesaSeleccionada(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Mesas" />
      <SubHeader
        title="Gestión de Mesas"
        subtitle="Selecciona para ocupar / desocupar"
        rightIconName="restaurant-outline"
        rightIconLibrary="Ionicons"
        rightIconColor="#E87D29"
      />

      {/* Resumen */}
      <View style={styles.resumen}>
        <View style={styles.resumenItem}>
          <View style={[styles.dot, { backgroundColor: '#28A745' }]} />
          <Text style={styles.resumenText}>{disponibles} Disponibles</Text>
        </View>
        <View style={styles.resumenItem}>
          <View style={[styles.dot, { backgroundColor: '#EF4444' }]} />
          <Text style={styles.resumenText}>{ocupadas} Ocupadas</Text>
        </View>
      </View>

      <View style={styles.tabsMenu}>
        {tabs.map((tab, i) => (
          <TouchableOpacity 
            key={i} 
            style={tab.active ? styles.tabItemActive : styles.tabItem} 
            onPress={() => tab.onPress && navigation.navigate(tab.onPress)}
          >
            <Text style={tab.active ? styles.tabTextActive : styles.tabText}>{tab.label}</Text>
            {tab.active && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Grid de mesas */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.grid}>
        {mesas.map((mesa) => (
          <TouchableOpacity
            key={mesa.id}
            style={[styles.mesaCard, mesa.ocupada && styles.mesaOcupada]}
            onPress={() => abrirModal(mesa)}
          >
            <View style={[styles.mesaIconCircle, { backgroundColor: mesa.ocupada ? '#EF4444' : '#28A745' }]}>
              <Ionicons name={mesa.ocupada ? 'lock-closed' : 'restaurant'} size={24} color="#FFF" />
            </View>
            <Text style={styles.mesaNumero}>Mesa {mesa.id}</Text>
            <Text style={styles.mesaCapacidad}>
              <Ionicons name="people-outline" size={12} color="#9E8A7D" /> {mesa.capacidad} personas
            </Text>
            {mesa.ocupada && (
              <View style={styles.personasBadge}>
                <Text style={styles.personasBadgeText}>{mesa.personas} sentados</Text>
              </View>
            )}
            <Text style={[styles.mesaEstado, { color: mesa.ocupada ? '#EF4444' : '#28A745' }]}>
              {mesa.ocupada ? 'Ocupada' : 'Disponible'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal para seleccionar cantidad de personas */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Mesa {mesaSeleccionada?.id}</Text>
            <Text style={styles.modalSub}>¿Cuántas personas se sentarán?</Text>
            <Text style={styles.modalCapacidad}>Capacidad máxima: {mesaSeleccionada?.capacidad}</Text>

            <View style={styles.counterRow}>
              <TouchableOpacity
                style={styles.counterBtn}
                onPress={() => setPersonasSeleccionadas(prev => Math.max(1, prev - 1))}
              >
                <Ionicons name="remove" size={24} color="#5B3E31" />
              </TouchableOpacity>
              <Text style={styles.counterNumber}>{personasSeleccionadas}</Text>
              <TouchableOpacity
                style={styles.counterBtn}
                onPress={() => setPersonasSeleccionadas(prev => Math.min(mesaSeleccionada?.capacidad || 1, prev + 1))}
              >
                <Ionicons name="add" size={24} color="#5B3E31" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.btnConfirmar} onPress={confirmarMesa}>
              <Ionicons name="checkmark" size={20} color="#FFF" />
              <Text style={styles.btnConfirmarText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnCerrar} onPress={() => setModalVisible(false)}>
              <Text style={styles.btnCerrarText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de confirmación para desocupar */}
      <ConfirmModal
        visible={confirmModalVisible}
        title="Desocupar Mesa"
        message={`¿Estás seguro que deseas liberar la Mesa ${mesaSeleccionada?.id}?`}
        onConfirm={confirmarDesocupar}
        onCancel={() => {
          setConfirmModalVisible(false);
          setMesaSeleccionada(null);
        }}
        confirmText="Liberar"
        confirmColor="#E87D29"
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
  resumen: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 30,
  },
  resumenItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  resumenText: {
    fontSize: 14,
    color: '#5B3E31',
    fontWeight: '500',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    paddingBottom: 100,
    justifyContent: 'space-between',
  },
  mesaCard: {
    width: '47%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#E5F6EB',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  mesaOcupada: {
    borderColor: '#FEE2E2',
    backgroundColor: '#FFFBFB',
  },
  mesaIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  mesaNumero: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5B3E31',
    marginBottom: 4,
  },
  mesaCapacidad: {
    fontSize: 12,
    color: '#9E8A7D',
    marginBottom: 6,
  },
  mesaEstado: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  personasBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    marginBottom: 6,
  },
  personasBadgeText: {
    fontSize: 11,
    color: '#D97706',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 30,
    width: '85%',
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5B3E31',
    marginBottom: 6,
  },
  modalSub: {
    fontSize: 14,
    color: '#9E8A7D',
    marginBottom: 4,
  },
  modalCapacidad: {
    fontSize: 12,
    color: '#D97706',
    fontWeight: '500',
    marginBottom: 25,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  counterBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3EDE6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#5B3E31',
    marginHorizontal: 30,
  },
  btnConfirmar: {
    flexDirection: 'row',
    backgroundColor: '#28A745',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnConfirmarText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  btnCerrar: {
    paddingVertical: 10,
  },
  btnCerrarText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
