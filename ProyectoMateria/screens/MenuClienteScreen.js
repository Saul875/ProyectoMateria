import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';

const products = [
    {
        name: 'Cappuccino',
        price: '$ 3,00',
        image: 'https://pngimg.com/uploads/cappuccino/cappuccino_PNG26.png',
    },
    {
        name: 'Moca',
        price: '$ 3,50',
        image: 'https://pngimg.com/uploads/coffee/coffee_PNG188.png',
    },
    {
        name: 'Espresso',
        price: '$ 2,50',
        image: 'https://pngimg.com/uploads/coffee/coffee_PNG10615.png',
    },
    {
        name: 'Latte',
        price: '$ 2,50',
        image: 'https://pngimg.com/uploads/coffee/coffee_PNG16864.png',
    },
];

const tabs = [
    { label: 'Menú', active: true, onPress: null },
    { label: 'Mesas', active: false, onPress: 'Mesas' },
];

export default function MenuClienteScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Header title="Mesero - Menú" />
            <SubHeader
                title="Coffee"
                subtitle="Integrated Management System"
                rightIconName="basket"
                rightIconLibrary="MaterialCommunityIcons"
                rightIconColor="#8D7A4E"
                showBorder
                onRightIconPress={() => navigation.navigate('OrdersCliente')}
            />

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

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.products}>
                {products.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.card}
                        onPress={() => navigation.navigate('ProductDetails')}
                    >
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <Text style={styles.productName}>{item.name}</Text>

                        <View style={styles.row}>
                            <Text style={styles.price}>{item.price}</Text>
                            <View style={styles.plus}>
                                <Ionicons name="add" size={16} color="#FFF" />
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
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
    products: {
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
        width: 100,
        height: 90,
        resizeMode: 'contain',
    },
    productName: {
        color: '#5B3E31',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    row: {
        width: '100%',
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        color: '#8D7A4E',
        fontWeight: 'bold',
        fontSize: 15,
    },
    plus: {
        backgroundColor: '#8D7A4E',
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
});