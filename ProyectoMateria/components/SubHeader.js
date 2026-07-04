import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SubHeader({ title, subtitle, rightIconName, rightIconLibrary, rightIconColor, onRightIconPress, showBorder }) {
  const navigation = useNavigation();
  
  return (
    <View style={styles.subHeader}>
      <View style={styles.titleRow}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#5B3E31" />
        </TouchableOpacity>
        <View style={styles.titleTextContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
      {rightIconName && (
        <TouchableOpacity 
          style={[styles.iconContainer, showBorder && styles.iconBorder]} 
          onPress={onRightIconPress}
          disabled={!onRightIconPress}
        >
          {rightIconLibrary === 'MaterialCommunityIcons' ? (
            <MaterialCommunityIcons name={rightIconName} size={24} color={rightIconColor || '#D29034'} />
          ) : (
            <Ionicons name={rightIconName} size={24} color={rightIconColor || '#D29034'} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleTextContainer: {
    marginLeft: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5B3E31',
  },
  subtitle: {
    fontSize: 14,
    color: '#9E8A7D',
  },
  iconContainer: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconBorder: {
    borderWidth: 1,
    borderColor: '#E5F6EB',
  }
});
