import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function ProductDetailsScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Ionicons name="menu" size={24} color="#777" />

            <Text style={styles.title}>Coffee</Text>
            <Text style={styles.subtitle}>Integrated Management System</Text>
            <Text style={styles.details}>Details</Text>

            <View style={styles.card}>
                <View style={styles.imageBox}>
                    <Image
                        source={{ uri: 'https://pngimg.com/uploads/cappuccino/cappuccino_PNG26.png' }}
                        style={styles.image}
                    />
                </View>

                <Text style={styles.product}>Cappuccino</Text>

                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.description}>
                    A cappuccino is an approximately 150 ml drink, with 25 ml of espresso coffee and 85 ml of fresh milk.
                </Text>

                <View style={styles.sizes}>
                    <Text style={styles.size}>S</Text>
                    <Text style={styles.size}>M</Text>
                    <Text style={styles.size}>L</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.priceButton}>
                <Text style={styles.price}>$ 3,00</Text>
            </TouchableOpacity>

            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => navigation.navigate('MenuCliente')}>
                    <Ionicons name="home" size={22} color="#8D7A4E" />
                </TouchableOpacity>
                <Feather name="coffee" size={22} color="#8D7A4E" />
                <TouchableOpacity onPress={() => navigation.navigate('OrdersCliente')}>
                    <Ionicons name="bag-outline" size={22} color="#AAA" />
                </TouchableOpacity>
                <Ionicons name="notifications-outline" size={22} color="#AAA" />
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
        color: '#FFF',
        textAlign: 'center',
        fontSize: 28,
        marginTop: -25,
    },
    subtitle: {
        color: '#8D7A4E',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 12,
    },
    details: {
        color: '#FFF',
        textAlign: 'center',
        marginTop: 8,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#B8B8B8',
        marginTop: 35,
        borderRadius: 25,
        padding: 20,
    },
    imageBox: {
        backgroundColor: '#DDD',
        borderRadius: 20,
        alignItems: 'center',
        padding: 15,
    },
    image: {
        width: 170,
        height: 130,
        resizeMode: 'contain',
    },
    product: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        marginTop: 10,
    },
    sectionTitle: {
        color: '#333',
        fontWeight: 'bold',
        marginTop: 15,
    },
    description: {
        color: '#F5F5F5',
        fontSize: 12,
        marginTop: 5,
    },
    sizes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 25,
    },
    size: {
        backgroundColor: '#F7F7F7',
        paddingHorizontal: 23,
        paddingVertical: 8,
        borderRadius: 20,
        color: '#8D7A4E',
        fontWeight: 'bold',
    },
    priceButton: {
        backgroundColor: '#FFF',
        marginTop: 25,
        borderRadius: 25,
        padding: 17,
        alignItems: 'center',
    },
    price: {
        color: '#8D7A4E',
        fontWeight: 'bold',
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