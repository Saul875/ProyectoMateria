import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

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

export default function MenuClienteScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Coffee</Text>
            <Text style={styles.subtitle}>Integrated Management System</Text>
            <Text style={styles.menu}>MENU</Text>

            <View style={styles.orderBox}>
                <Text style={styles.orderText}>New order...</Text>
                <Ionicons name="add" size={18} color="#8D7A4E" />
            </View>

            <ScrollView contentContainerStyle={styles.products}>
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
                                <Ionicons name="add" size={16} color="#8D7A4E" />
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.navbar}>
                <Ionicons name="home" size={22} color="#8D7A4E" />
                <Feather name="coffee" size={22} color="#8D7A4E" />
                <TouchableOpacity onPress={() => navigation.navigate('OrdersCliente')}>
                    <Ionicons name="bag-outline" size={22} color="#999" />
                </TouchableOpacity>
                <Ionicons name="notifications-outline" size={22} color="#999" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F3EF',
        paddingTop: 55,
        paddingHorizontal: 25,
    },
    title: {
        textAlign: 'center',
        fontSize: 28,
        color: '#B8B8B8',
        fontWeight: '500',
    },
    subtitle: {
        textAlign: 'center',
        color: '#8D7A4E',
        fontWeight: 'bold',
        fontSize: 12,
    },
    menu: {
        textAlign: 'center',
        marginTop: 5,
        color: '#8D7A4E',
        fontWeight: 'bold',
    },
    orderBox: {
        backgroundColor: '#FFF',
        marginTop: 20,
        borderRadius: 10,
        padding: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderText: {
        color: '#8D7A4E',
        fontWeight: '500',
    },
    products: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingBottom: 120,
        marginTop: 20,
    },
    card: {
        width: '47%',
        backgroundColor: '#E8E6E3',
        borderRadius: 25,
        padding: 15,
        marginBottom: 20,
        alignItems: 'center',
    },
    image: {
        width: 90,
        height: 80,
        resizeMode: 'contain',
    },
    productName: {
        color: '#AAA',
        marginTop: 5,
    },
    row: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        color: '#8D7A4E',
        fontWeight: 'bold',
    },
    plus: {
        backgroundColor: '#FFF',
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navbar: {
        position: 'absolute',
        bottom: 85,
        left: 25,
        right: 25,
        backgroundColor: '#FFF',
        borderRadius: 25,
        paddingVertical: 16,
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});