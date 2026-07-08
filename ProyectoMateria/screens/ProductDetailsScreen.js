import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';

export default function ProductDetailsScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Header title="Mesero - Detalle" />
            <SubHeader
                title="Coffee"
                subtitle="Integrated Management System"
            />

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

            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>Volver</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.priceButton}>
                    <Text style={styles.price}>Añadir por $ 3,00</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F3EA',
    },
    card: {
        backgroundColor: '#FFF',
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 25,
        padding: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },
    imageBox: {
        backgroundColor: '#F9F3EA',
        borderRadius: 20,
        alignItems: 'center',
        padding: 15,
        marginBottom: 15,
    },
    image: {
        width: 170,
        height: 130,
        resizeMode: 'contain',
    },
    product: {
        textAlign: 'center',
        color: '#5B3E31',
        fontWeight: 'bold',
        fontSize: 22,
    },
    sectionTitle: {
        color: '#9E8A7D',
        fontWeight: 'bold',
        marginTop: 15,
    },
    description: {
        color: '#5B3E31',
        fontSize: 14,
        marginTop: 5,
        lineHeight: 20,
    },
    sizes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 25,
    },
    size: {
        backgroundColor: '#F9F3EA',
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 20,
        color: '#5B3E31',
        fontWeight: 'bold',
        overflow: 'hidden',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 30,
        gap: 15,
    },
    backButton: {
        flex: 1,
        backgroundColor: '#E5DFD6',
        borderRadius: 25,
        padding: 18,
        alignItems: 'center',
    },
    backText: {
        color: '#5B3E31',
        fontWeight: 'bold',
        fontSize: 16,
    },
    priceButton: {
        flex: 2,
        backgroundColor: '#28A745',
        borderRadius: 25,
        padding: 18,
        alignItems: 'center',
    },
    price: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});