import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';

export default function OrderDetailsClienteScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Header title="Mesero - Detalle Órdenes" />
            <SubHeader
                title="Coffee"
                subtitle="Integrated Management System"
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>
                    <View style={styles.switchBox}>
                        <Text style={styles.active}>Deliver</Text>
                        <Text style={styles.inactive}>Pick Up</Text>
                    </View>

                    <View style={styles.actions}>
                        <Text style={styles.action}>Edit Orders</Text>
                        <Text style={styles.action}>Add Note</Text>
                    </View>

                    <View style={styles.item}>
                        <Image
                            source={{ uri: 'https://pngimg.com/uploads/cappuccino/cappuccino_PNG26.png' }}
                            style={styles.itemImage}
                        />
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>Mocha</Text>
                            <Text style={styles.itemSub}>Deep Foam</Text>
                        </View>
                        <View style={styles.quantityBox}>
                            <Ionicons name="remove" size={16} color="#5B3E31" />
                            <Text style={styles.quantity}>1</Text>
                            <Ionicons name="add" size={16} color="#5B3E31" />
                        </View>
                    </View>

                    <View style={styles.item}>
                        <Image
                            source={{ uri: 'https://pngimg.com/uploads/coffee/coffee_PNG188.png' }}
                            style={styles.itemImage}
                        />
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>Mocha</Text>
                            <Text style={styles.itemSub}>Deep Foam</Text>
                        </View>
                        <View style={styles.quantityBox}>
                            <Ionicons name="remove" size={16} color="#5B3E31" />
                            <Text style={styles.quantity}>1</Text>
                            <Ionicons name="add" size={16} color="#5B3E31" />
                        </View>
                    </View>

                    <View style={styles.discount}>
                        <Text style={styles.discountText}>1 Discount is Applied</Text>
                        <Ionicons name="chevron-forward" size={18} color="#9E8A7D" />
                    </View>

                    <View style={styles.priceRow}>
                        <Text style={styles.label}>Price</Text>
                        <Text style={styles.value}>$ 4,53</Text>
                    </View>

                    <View style={styles.priceRow}>
                        <Text style={styles.label}>Delivery Fee</Text>
                        <Text style={styles.value}>$ 0,90</Text>
                    </View>

                    <View style={styles.payment}>
                        <Text style={styles.paymentLabel}>Cash/Wallet</Text>
                        <Text style={styles.paymentValue}>$ 5,53</Text>
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.orderButton} onPress={() => navigation.goBack()}>
                            <Text style={styles.orderText}>Confirmar Orden</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F3EA',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 25,
        padding: 20,
        marginTop: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },
    switchBox: {
        backgroundColor: '#F9F3EA',
        borderRadius: 20,
        flexDirection: 'row',
        padding: 4,
        marginBottom: 15,
    },
    active: {
        flex: 1,
        backgroundColor: '#8D7A4E',
        color: '#FFF',
        textAlign: 'center',
        borderRadius: 18,
        paddingVertical: 10,
        fontWeight: 'bold',
    },
    inactive: {
        flex: 1,
        textAlign: 'center',
        paddingVertical: 10,
        fontWeight: 'bold',
        color: '#9E8A7D',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        gap: 10,
    },
    action: {
        borderWidth: 1,
        borderColor: '#E5DFD6',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 6,
        color: '#9E8A7D',
        fontSize: 12,
        fontWeight: 'bold',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: '#F9F3EA',
        padding: 10,
        borderRadius: 15,
    },
    itemImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    itemInfo: {
        flex: 1,
        marginLeft: 15,
    },
    itemTitle: {
        color: '#5B3E31',
        fontWeight: 'bold',
        fontSize: 16,
    },
    itemSub: {
        color: '#9E8A7D',
        fontSize: 12,
        marginTop: 2,
    },
    quantityBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    quantity: {
        color: '#5B3E31',
        fontWeight: 'bold',
        marginHorizontal: 8,
    },
    discount: {
        marginTop: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#E5DFD6',
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    discountText: {
        color: '#5B3E31',
        fontWeight: 'bold',
        fontSize: 14,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    label: {
        color: '#9E8A7D',
        fontWeight: '500',
    },
    value: {
        color: '#5B3E31',
        fontWeight: 'bold',
    },
    payment: {
        marginTop: 20,
        borderTopWidth: 1,
        borderColor: '#E5DFD6',
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    paymentLabel: {
        color: '#5B3E31',
        fontWeight: 'bold',
        fontSize: 16,
    },
    paymentValue: {
        color: '#8D7A4E',
        fontWeight: 'bold',
        fontSize: 18,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
        gap: 15,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#E5DFD6',
        borderRadius: 20,
        paddingVertical: 16,
        alignItems: 'center',
    },
    cancelText: {
        color: '#5B3E31',
        fontWeight: 'bold',
        fontSize: 16,
    },
    orderButton: {
        flex: 2,
        backgroundColor: '#28A745',
        borderRadius: 20,
        paddingVertical: 16,
        alignItems: 'center',
    },
    orderText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});