//zona1: importaciones
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import ActionButton from '../components/ActionButton';

//Zona2: componente
export default function SolicitudSuministrosScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Caja - Suministros" />
      <SubHeader
        title="Coffee"
        subtitle="Integrated Management System"
        rightIconName="cube"
        rightIconLibrary="Ionicons"
        rightIconColor="#D97706"
        showBorder
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.form}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Solicitud de Productos</Text>
          <Text style={styles.cardSub}>Restock de suministros</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tipo de Producto</Text>
          <TextInput style={styles.input} placeholder="Ej. Café, Leche..." />
        </View>

        <ActionButton label="Confirmar Solicitud" color="#6B7280" iconName="checkmark" />
        <ActionButton label="Volver"  color="#EF4444" iconName="close" onPress={() => navigation.goBack()} />
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
  form: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
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
    backgroundColor: '#FFF',
    height: 50,
    borderRadius: 15,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
});
