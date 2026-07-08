import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';

export default function OrdersClienteScreen({ navigation }) {
    const orders = [
        {
            name: 'Order 1',
            price: '$ 38,00',
            image: 'https://pngimg.com/uploads/cappuccino/cappuccino_PNG26.png',
        },
        {
            name: 'Order 2',
            price: '$ 3,50',
            image: 'https://pngimg.com/uploads/cake/cake_PNG13067.png',
        },
        {
            name: 'Order 3',
            price: '$ 8,00',
            image: 'https://pngimg.com/uploads/coffee/coffee_PNG16864.png',
        },
        {
            name: 'Order 4',
            price: '$ 3,00',
            image: 'https://pngimg.com/uploads/coffee/coffee_PNG188.png',
        },
    ];

    const tabs = [
        { label: 'Delivery', active: true },
        { label: 'In progress', active: false },
        { label: 'Pending', active: false },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Mesero - Órdenes" />
            <SubHeader
                title="Coffee"
                subtitle="Integrated Management System"
                rightIconName="basket"
                rightIconLibrary="MaterialCommunityIcons"
                rightIconColor="#8D7A4E"
                showBorder
            />

            <View style={styles.tabsMenu}>
                {tabs.map((tab, i) => (
                    <TouchableOpacity key={i} style={tab.active ? styles.tabItemActive : styles.tabItem}>
                        <Text style={tab.active ? styles.tabTextActive : styles.tabText}>{tab.label}</Text>
                        {tab.active && <View style={styles.tabIndicator} />}
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.orders}>
                {orders.map((item, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={styles.card} 
                        onPress={() => navigation.navigate('OrderDetailsCliente')}
                    >
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <Text style={styles.name}>{item.name}</Text>

                        <View style={styles.priceBox}>
                            <Text style={styles.price}>{item.price}</Text>
                            {index === 1 && (
                                <View style={styles.plus}>
                                    <Ionicons name="add" size={16} color="#FFF" />
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity style={styles.volverBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.volverText}>Volver al Menú</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

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
        fontSize: 14,
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
    orders: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    card: {
        width: '48%',
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },
    image: {
        width: 90,
        height: 80,
        resizeMode: 'contain',
    },
    name: {
        color: '#5B3E31',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    priceBox: {
        backgroundColor: '#F9F3EA',
        borderRadius: 20,
        marginTop: 10,
        paddingVertical: 8,
        paddingHorizontal: 15,
        minWidth: 90,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    price: {
        color: '#8D7A4E',
        fontWeight: 'bold',
    },
    plus: {
        backgroundColor: '#8D7A4E',
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    volverBtn: {
        width: '100%',
        backgroundColor: '#E5DFD6',
        borderRadius: 20,
        padding: 16,
        marginTop: 20,
        alignItems: 'center',
    },
    volverText: {
        color: '#5B3E31',
        fontWeight: 'bold',
        fontSize: 16,
    },
});