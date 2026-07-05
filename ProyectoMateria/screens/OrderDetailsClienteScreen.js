import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function OrderDetailsScreen({ goOrders }) {
    return (
        <View style={styles.container}>
            <Ionicons name="menu" size={24} color="#777" />

            <Text style={styles.title}>Coffee</Text>
            <Text style={styles.subtitle}>Integrated Management System</Text>
            <Text style={styles.details}>Orders Details</Text>

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
                    <Text style={styles.quantity}>− 1 +</Text>
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
                    <Text style={styles.quantity}>− 1 +</Text>
                </View>

                <View style={styles.discount}>
                    <Text style={styles.discountText}>1 Discount is Applies</Text>
                    <Ionicons name="chevron-forward" size={18} color="#777" />
                </View>

                <View style={styles.priceRow}>
                    <Text style={styles.label}>Price</Text>
                    <Text style={styles.value}>$ 4,53</Text>
                </View>

                <View style={styles.priceRow}>
                    <Text style={styles.label}>Delivery Fee</Text>
                    <Text style={styles.value}>$ 0,90  $1,0</Text>
                </View>

                <View style={styles.payment}>
                    <Text style={styles.paymentText}>Cash/Wallet</Text>
                    <Text style={styles.paymentText}>$ 5,53</Text>
                </View>

                <Pressable style={styles.orderButton} onPress={goOrders}>
                    <Text style={styles.orderText}>Order</Text>
                </Pressable>
            </View>

            <View style={styles.navbar}>
                <Ionicons name="home" size={22} color="#111" />
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
    details: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 5,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 25,
        padding: 16,
        marginTop: 15,
    },
    switchBox: {
        backgroundColor: '#eee',
        borderRadius: 20,
        flexDirection: 'row',
        padding: 4,
    },
    active: {
        flex: 1,
        backgroundColor: '#8d7a4e',
        color: '#fff',
        textAlign: 'center',
        borderRadius: 18,
        padding: 8,
        fontWeight: 'bold',
    },
    inactive: {
        flex: 1,
        textAlign: 'center',
        padding: 8,
        fontWeight: 'bold',
        color: '#777',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
        gap: 10,
    },
    action: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 4,
        color: '#777',
        fontSize: 12,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    itemImage: {
        width: 45,
        height: 45,
        resizeMode: 'contain',
    },
    itemInfo: {
        flex: 1,
        marginLeft: 10,
    },
    itemTitle: {
        color: '#8d7a4e',
        fontWeight: 'bold',
    },
    itemSub: {
        color: '#aaa',
        fontSize: 12,
    },
    quantity: {
        color: '#555',
        fontWeight: 'bold',
    },
    discount: {
        marginTop: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#eee',
        paddingVertical: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    discountText: {
        color: '#555',
        fontWeight: 'bold',
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 14,
    },
    label: {
        color: '#777',
    },
    value: {
        color: '#444',
        fontWeight: 'bold',
    },
    payment: {
        marginTop: 22,
        borderTopWidth: 1,
        borderColor: '#eee',
        paddingTop: 14,
    },
    paymentText: {
        color: '#333',
        fontWeight: 'bold',
    },
    orderButton: {
        backgroundColor: '#8d7a4e',
        borderRadius: 10,
        marginTop: 15,
        paddingVertical: 14,
        alignItems: 'center',
    },
    orderText: {
        color: '#fff',
        fontWeight: 'bold',
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