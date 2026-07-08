//zona1: importaciones
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import ActionButton from '../components/ActionButton';
import ConfirmModal from '../components/ConfirmModal';

const products = [
  { name: 'Cappuccino', price: '$8.00' },
  { name: 'Moca',       price: '$5.50' },
  { name: 'Espresso',   price: '$3.00' },
  { name: 'Croissant',  price: '$6.00' },
];

const paymentMethods = [
  { label: 'Efectivo', icon: 'cash-outline' },
  { label: 'Tarjeta',  icon: 'card-outline' },
  { label: 'Transfer', icon: 'phone-portrait-outline' },
];

const actions = [
  { label: 'Realizar Cobro',    color: '#28A745', iconName: 'cash-outline' },
  { label: 'Generar Ticket',   color: '#3B82F6', iconName: 'receipt-outline' },
  { label: 'Cancelar Cuenta',  color: '#EF4444', iconName: 'close' },
  { label: 'Volver',           color: '#6B7280', iconName: 'arrow-back-outline' },
];

//Zona2: componente
export default function CajaCuentaScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [pagoModalVisible, setPagoModalVisible] = React.useState(false);
  const [selectedMethod, setSelectedMethod] = React.useState(0);

  const handleAction = (label) => {
    if (label === 'Cancelar Cuenta') {
      setModalVisible(true);
    } else if (label === 'Volver') {
      navigation.goBack();
    } else if (label === 'Realizar Cobro') {
      setPagoModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Caja - Cuenta" />
      <SubHeader
        title="Coffee"
        subtitle="Integrated Management System"
        rightIconName="currency-usd"
        rightIconLibrary="MaterialCommunityIcons"
        rightIconColor="#28A745"
        showBorder
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Mesa 5</Text>
          <Text style={styles.cardSub}>Cliente: Juan Pérez</Text>
        </View>

        <View style={styles.productsCard}>
          <View style={styles.rowIcon}>
            <Ionicons name="receipt-outline" size={18} color="#5B3E31" />
            <Text style={styles.sectionTitle}>Productos</Text>
          </View>
          {products.map((p, i) => (
            <View key={i}>
              <View style={styles.productRow}>
                <Text style={styles.productName}>{p.name}</Text>
                <Text style={styles.productPrice}>{p.price}</Text>
              </View>
              {i < products.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
          <View style={styles.totalSection}>
            <View style={styles.productRow}><Text style={styles.totalLabel}>Subtotal</Text><Text style={styles.totalValue}>$22.50</Text></View>
            <View style={styles.productRow}><Text style={styles.totalLabel}>IVA (16%)</Text><Text style={styles.totalValue}>$3.60</Text></View>
            <View style={styles.dividerLight} />
            <View style={styles.productRow}><Text style={styles.finalLabel}>Total a Cobrar</Text><Text style={styles.finalValue}>$26.10</Text></View>
          </View>
        </View>

        <View style={styles.payCard}>
          <View style={styles.rowIcon}>
            <Ionicons name="card-outline" size={18} color="#5B3E31" />
            <Text style={styles.sectionTitle}>Métodos de Pago</Text>
          </View>
          <Text style={styles.cardSub}>Selecciona el método:</Text>
          <View style={styles.methodsRow}>
            {paymentMethods.map((m, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.methodBtn, selectedMethod === i && styles.methodBtnActive]}
                onPress={() => setSelectedMethod(i)}
              >
                <Ionicons name={m.icon} size={24} color={selectedMethod === i ? '#FFF' : '#5B3E31'} />
                <Text style={selectedMethod === i ? styles.methodTextActive : styles.methodText}>{m.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {actions.map((a, i) => (
            <ActionButton key={i} label={a.label} color={a.color} iconName={a.iconName} onPress={() => handleAction(a.label)} />
          ))}
        </View>

      </ScrollView>

      <ConfirmModal
        visible={modalVisible}
        title="Cancelar Cuenta"
        message="¿Estás seguro que deseas cancelar esta cuenta? Esta acción no se puede deshacer."
        onConfirm={() => {
          setModalVisible(false);
          // Lógica para cancelar la cuenta
        }}
        onCancel={() => setModalVisible(false)}
        confirmText="Cancelar Cuenta"
      />

      {/* Modal de pago exitoso */}
      <Modal visible={pagoModalVisible} transparent animationType="fade">
        <View style={styles.pagoOverlay}>
          <View style={styles.pagoCard}>
            <View style={styles.pagoIconCircle}>
              <Ionicons name="checkmark" size={48} color="#FFF" />
            </View>
            <Text style={styles.pagoTitle}>¡Pago Exitoso!</Text>
            <Text style={styles.pagoSub}>El cobro ha sido registrado correctamente.</Text>

            <View style={styles.pagoTotalBox}>
              <Text style={styles.pagoTotalLabel}>Total cobrado</Text>
              <Text style={styles.pagoTotalValue}>$26.10</Text>
            </View>

            <View style={styles.pagoMeta}>
              <Ionicons name="cash-outline" size={16} color="#9E8A7D" />
              <Text style={styles.pagoMetaText}>Mesa 5 · Juan Pérez · Efectivo</Text>
            </View>

            <TouchableOpacity
              style={styles.pagoBtn}
              onPress={() => {
                setPagoModalVisible(false);
                navigation.goBack();
              }}
            >
              <Text style={styles.pagoBtnText}>Aceptar</Text>
            </TouchableOpacity>
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
    paddingBottom: 120,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
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
  productsCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  payCard: {
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
  rowIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5B3E31',
    marginLeft: 8,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  productName: {
    fontSize: 14,
    color: '#5B3E31',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5B3E31',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  totalSection: {
    backgroundColor: '#785A46',
    marginHorizontal: -20,
    marginBottom: -20,
    marginTop: 15,
    padding: 20,
  },
  totalLabel: {
    color: '#EBE0D6',
    fontSize: 14,
  },
  totalValue: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  dividerLight: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginVertical: 10,
  },
  finalLabel: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  finalValue: {
    color: '#4ADE80',
    fontSize: 20,
    fontWeight: 'bold',
  },
  methodsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  methodBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#EBE0D6',
    borderRadius: 15,
    marginHorizontal: 4,
  },
  methodBtnActive: {
    backgroundColor: '#785A46',
    borderColor: '#785A46',
  },
  methodText: {
    marginTop: 8,
    fontSize: 12,
    color: '#5B3E31',
    fontWeight: '500',
  },
  methodTextActive: {
    marginTop: 8,
    fontSize: 12,
    color: '#FFF',
    fontWeight: '500',
  },
  pagoOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  pagoCard: {
    backgroundColor: '#FFF',
    borderRadius: 28,
    padding: 32,
    width: '100%',
    alignItems: 'center',
    elevation: 10,
  },
  pagoIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#28A745',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#28A745',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  pagoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5B3E31',
    marginBottom: 8,
  },
  pagoSub: {
    fontSize: 14,
    color: '#9E8A7D',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  pagoTotalBox: {
    backgroundColor: '#F9F3EA',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  pagoTotalLabel: {
    fontSize: 13,
    color: '#9E8A7D',
    fontWeight: '500',
    marginBottom: 4,
  },
  pagoTotalValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#28A745',
  },
  pagoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    gap: 6,
  },
  pagoMetaText: {
    fontSize: 13,
    color: '#9E8A7D',
  },
  pagoBtn: {
    backgroundColor: '#28A745',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 50,
    width: '100%',
    alignItems: 'center',
  },
  pagoBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 17,
  },
});

