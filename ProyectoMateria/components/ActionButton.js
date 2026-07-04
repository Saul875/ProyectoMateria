//zona1: importaciones
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//Zona2: componente
export default function ActionButton({ label, color, iconName, onPress }) {
  return (
    <TouchableOpacity style={[styles.btn, { backgroundColor: color }]} onPress={onPress}>
      <Ionicons name={iconName} size={20} color="#FFF" />
      <Text style={styles.btnText}>{label}</Text>
    </TouchableOpacity>
  );
}

//Zona3: estilos
const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  btnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
