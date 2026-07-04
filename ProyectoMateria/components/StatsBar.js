//zona1: importaciones
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//Zona2: componente
export function StatBox({ number, label, color }) {
  return (
    <View style={styles.statItem}>
      <Text style={[styles.statNumber, { color }]}>{number}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export function StatsBar({ stats }) {
  return (
    <View style={styles.statsContainer}>
      {stats.map((s, i) => (
        <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
          {i > 0 && <View style={styles.divider} />}
          <StatBox number={s.number} label={s.label} color={s.color} />
        </View>
      ))}
    </View>
  );
}

//Zona3: estilos
const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#9E8A7D',
    marginTop: 4,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#EBE0D6',
  },
});
