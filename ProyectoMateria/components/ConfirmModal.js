import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

export default function ConfirmModal({ visible, title, message, onConfirm, onCancel, confirmText = "Confirmar", cancelText = "Cancelar", confirmColor = "#EF4444" }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalSub}>{message}</Text>
          
          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.btnCerrar} onPress={onCancel}>
              <Text style={styles.btnCerrarText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnConfirmar, { backgroundColor: confirmColor }]} onPress={onConfirm}>
              <Text style={styles.btnConfirmarText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 25,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5B3E31',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSub: {
    fontSize: 14,
    color: '#9E8A7D',
    marginBottom: 25,
    textAlign: 'center',
  },
  btnRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  btnCerrar: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EBE0D6',
  },
  btnCerrarText: {
    color: '#5B3E31',
    fontSize: 14,
    fontWeight: 'bold',
  },
  btnConfirmar: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 15,
  },
  btnConfirmarText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
