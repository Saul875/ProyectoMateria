import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function RoleLoginScreen({ navigation }) {
    return (
        <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e' }}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>Coffee Personal</Text>
                <Text style={styles.subtitle}>Integrated Management System</Text>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Select Your Role</Text>

                    <TouchableOpacity 
                        style={[styles.button, styles.btnMesero]} 
                        onPress={() => navigation.navigate('Cliente', { screen: 'MenuClienteScreen' })}
                    >
                        <Ionicons name="restaurant-outline" size={24} color="#FFF" style={styles.icon} />
                        <Text style={styles.buttonText}>Mesero</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.button, styles.btnCocina]} 
                        onPress={() => navigation.navigate('Cocina')}
                    >
                        <MaterialCommunityIcons name="chef-hat" size={24} color="#FFF" style={styles.icon} />
                        <Text style={styles.buttonText}>Cocina</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.button, styles.btnCaja]} 
                        onPress={() => navigation.navigate('Caja')}
                    >
                        <Ionicons name="cash-outline" size={24} color="#FFF" style={styles.icon} />
                        <Text style={styles.buttonText}>Caja</Text>
                    </TouchableOpacity>

                    <Text style={styles.forgot}>Simulated Login Access</Text>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.65)',
        alignItems: 'center',
        paddingTop: 80,
    },
    title: {
        color: '#FFF',
        fontSize: 27,
        fontWeight: '600',
    },
    subtitle: {
        color: '#9B844E',
        fontSize: 13,
        fontWeight: 'bold',
    },
    card: {
        marginTop: 80,
        backgroundColor: '#2A2A2A',
        width: '85%',
        borderRadius: 28,
        padding: 25,
        borderWidth: 1,
        borderColor: '#444',
    },
    cardTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 25,
    },
    button: {
        flexDirection: 'row',
        borderRadius: 15,
        paddingVertical: 16,
        paddingHorizontal: 20,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnMesero: {
        backgroundColor: '#28A745',
    },
    btnCocina: {
        backgroundColor: '#E87D29',
    },
    btnCaja: {
        backgroundColor: '#3B82F6',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    icon: {
        position: 'absolute',
        left: 20,
    },
    forgot: {
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 12,
    },
});
