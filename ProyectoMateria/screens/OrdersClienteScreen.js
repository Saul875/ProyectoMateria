import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    ScrollView,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function OrdersScreen({ goMenu, goOrderDetails }) {
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

    return (
        <View style={styles.container}>
            <Ionicons name="menu" size={24} color="#777" />

            <Text style={styles.title}>Coffee</Text>
            <Text style={styles.subtitle}>Integrated Management System</Text>
            <Text style={styles.ordersTitle}>Orders</Text>

            <View style={styles.tabs}>
                <Text style={styles.activeTab}>Delivery</Text>
                <Text style={styles.tab}>In progress</Text>
                <Text style={styles.tab}>Pending</Text>
            </View>

            <ScrollView contentContainerStyle={styles.orders}>
                {orders.map((item, index) => (
                    <Pressable key={index} style={styles.card} onPress={goOrderDetails}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <Text style={styles.name}>{item.name}</Text>

                        <View style={styles.priceBox}>
                            <Text style={styles.price}>{item.price}</Text>
                            {index === 1 && (
                                <View style={styles.plus}>
                                    <Ionicons name="add" size={15} color="#8d7a4e" />
                                </View>
                            )}
                        </View>
                    </Pressable>
                ))}
            </ScrollView>

            <View style={styles.navbar}>
                <Pressable onPress={goMenu}>
                    <Ionicons name="home" size={22} color="#111" />
                </Pressable>
                <Feather name="coffee" size={22} color="#8d7a4e" />
                <Ionicons name="bag-outline" size={22} color="#8d7a4e" />
                <Ionicons name="notifications-outline" size={22} color="#aaa" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282828',
        paddingTop: 55,
        paddingHorizontal: 25,
    },
    title: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 28,
        marginTop: -25,
    },
    subtitle: {
        color: '#8d7a4e',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 12,
    },
    ordersTitle: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 5,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 18,
    },
    activeTab: {
        color: '#fff',
        borderBottomWidth: 2,
        borderBottomColor: '#fff',
        paddingBottom: 5,
        fontWeight: 'bold',
    },
    tab: {
        color: '#aaa',
        fontWeight: 'bold',
    },
    orders: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingBottom: 90,
        marginTop: 25,
    },
    card: {
        width: '47%',
        backgroundColor: '#b8b8b8',
        borderRadius: 25,
        padding: 15,
        alignItems: 'center',
        marginBottom: 22,
    },
    image: {
        width: 90,
        height: 80,
        resizeMode: 'contain',
    },
    name: {
        color: '#fff',
        fontWeight: 'bold',
    },
    priceBox: {
        backgroundColor: '#fff',
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
        color: '#8d7a4e',
        fontWeight: 'bold',
    },
    plus: {
        backgroundColor: '#fff',
        marginLeft: 10,
    },
    navbar: {
        position: 'absolute',
        bottom: 20,
        left: 25,
        right: 25,
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingVertical: 16,
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});